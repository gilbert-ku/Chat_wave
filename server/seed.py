#!/usr/bin/env python3

from app import app
from models import db, User, Chatroom, Message

with app.app_context():
    try:
        # Check for existing data and delete if necessary
        User.query.delete()
        Chatroom.query.delete()
        Message.query.delete()

        # Add users
        user1 = User(username="Okra", email="felicia@gmail.com", password_hash="hashed_password1")
        user2 = User(username="SlimShady", email="realslim@gmail.com", password_hash="hashed_password2")
        user3 = User(username="Kgogstile", email="earlsweatshirt@gmail.com", password_hash="hashed_password3")


        db.session.add_all([user1, user2, user3])
        db.session.commit()

        # Add chatrooms
        chatroom1 = Chatroom(chatroom_name="Generals")
        chatroom2 = Chatroom(chatroom_name="Admirals")
        chatroom3 = Chatroom(chatroom_name="Privateers")

        db.session.add_all([chatroom1, chatroom2, chatroom3])
        db.session.commit()

        # Add messages
        mess1 = Message(message_content="Hello", chatroom_id=1, user_id=1)
        mess2 = Message(message_content="Hi", chatroom_id=1, user_id=2)
        mess3 = Message(message_content="Hey", chatroom_id=1, user_id=3)

        db.session.add_all([mess1, mess2, mess3])
        db.session.commit()

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        db.session.rollback()

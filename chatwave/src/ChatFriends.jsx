// ChatFriends.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatFriends = ({ users }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000');

    socket.on('messages_retrieved', (data) => {
      setMessages(data);
    });

    socket.on('new_message', (incomingMessage) => {
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    if (!newMessage || !selectedFriend) {
      console.error('Invalid parameters for sendMessage');
      return;
    }

    const socket = io('http://127.0.0.1:5000');
    socket.emit('new_message', {
      message_content: newMessage,
      chatroom_id: selectedFriend.id,
      user_id: selectedFriend.id,
    });

    setNewMessage('');
  };

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.message_content}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />

        <select
          value={selectedFriend ? selectedFriend.id : ''}
          onChange={(e) =>
            setSelectedFriend(users.find((user) => user.id === e.target.value))
          }
        >
          <option value="" disabled>
            Select Friend
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatFriends;



















// ##############################################################

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const ChatFriends = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     const socket = io('http://127.0.0.1:5000');

//     // Connect to the 'messages_retrieved' event
//     socket.on('messages_retrieved', (data) => {
//       setMessages(data);
//     });

//     // Connect to the 'new_message' event
//     socket.on('new_message', (incomingMessage) => {
//       setMessages((prevMessages) => [...prevMessages, incomingMessage]);
//     });

//     // Clean up the socket connection on component unmount
//     return () => socket.disconnect();
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   const sendMessage = () => {
//     // Check if required parameters are provided
//     if (!newMessage) {
//       console.error('Message content cannot be empty');
//       return;
//     }

//     const socket = io('http://127.0.0.1:5000');

//     // Emit a 'new_message' event to the server
//     socket.emit('new_message', {
//       message_content: newMessage,
//       // Add additional parameters if needed
      
//     });

//     // Clear the input field after sending the message
//     setNewMessage('');
//   };

//   return (
//     <div>
//       <h1>Messages</h1>
//       <ul>
//         {messages.map((message) => (
//           <li key={message.id}>{message.message_content}</li>
//         ))}
//       </ul>
//       <div>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message"
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatFriends;


// ################################################################################################################


// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const ChatFriends = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     const socket = io('http://127.0.0.1:5000');

//     // Connect to the 'messages_retrieved' event
//     socket.on('messages_retrieved', (data) => {
//       setMessages(data);
//     });

//     // Connect to the 'new_message' event
//     socket.on('new_message', (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     // Clean up the socket connection on component unmount
//     return () => socket.disconnect();
//   }, []); // Empty dependency array means this effect runs once when the component mounts



// const sendMessage = (messageContent, chatroomId, userId) => {
//     // Check if required parameters are provided
//     if (!messageContent || !chatroomId || !userId) {
//       console.error("Invalid parameters for sendMessage");
//       return;
//     }
  
//     const socket = io("http://127.0.0.1:5000");
  
//     // Emit a 'new_message' event to the server
//     socket.emit("new_message", {
//       message_content: messageContent,
//       chatroom_id: chatroomId,
//       user_id: userId,
//     });
  
//     // Clear the input field after sending the message
//     setNewMessage("");
//   };

//   return (
//     <div>
//       <h1>Messages</h1>
//       <ul>
//         {messages.map((message) => (
//           <li key={message.id}>{message.message_content}</li>
//         ))}
//       </ul>
//       <div>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message"
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatFriends;

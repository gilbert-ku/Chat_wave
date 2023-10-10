// Chatroom.js

// its working one 
// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

// const Chatroom = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000');
//     setSocket(newSocket);

//     newSocket.on('new_message', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (socket) {
//       // Assuming you have the user's id available in your React component
//       const userId = 4; // Replace with the actual user's id

//       // Emit a new message to the server with the user's id
//       socket.emit('new_message', { message_content: newMessage, chatroom_id: 1, user_id: userId });

//       setNewMessage('');
//     }
//   };

//   return (
//     <div>
//       <div>
//         <h2>Chatroom</h2>
//         <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
//           {messages.map((message, index) => (
//             <div key={index}>
//               <strong>{message.user ? message.user.username : 'Unknown User'}:</strong> {message.message_content}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chatroom;

// ########################################


// its working
// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';
// import { v4 as uuidv4 } from 'uuid';

// const Chatroom = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [userId, setUserId] = useState(null);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000');
//     setSocket(newSocket);
  
//     // Generate a unique user ID
//     const generatedUserId = uuidv4();
//     setUserId(generatedUserId);
  
//     newSocket.on('connect', () => {
//       console.log('Connected to server');
//     });
  
//     newSocket.on('new_message', (data) => {
//       console.log('Received new message:', data);
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });
    
  
//     return () => {
//       newSocket.disconnect();
//       console.log('Disconnected from server');
//     };
//   }, []);
  
//   const sendMessage = () => {
//     if (socket) {
//       // Emit a new message to the server with the generated user id
//       socket.emit('new_message', { message_content: newMessage, chatroom_id: 1, user_id: userId });
      
//       console.log('Sent new message:', { message_content: newMessage, chatroom_id: 1, user_id: userId });
  
//       setNewMessage('');
//     }
//   };
  

//   return (
//     <div>
//       <div>
//         <h2>Chatroom</h2>
//         <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
//           {messages.map((message, index) => (
//             <div key={index}>
//               <strong>User ID:</strong> {message.user_id}:
//               <strong>Message:</strong> {message.message_content}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chatroom;

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Generate a unique user ID
    const generatedUserId = uuidv4();
    setUserId(generatedUserId);

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('new_message', (data) => {
      console.log('Received new message:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      newSocket.disconnect();
      console.log('Disconnected from server');
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      // Emit a new message to the server with the generated user id
      const newMessageData = { message_content: newMessage, chatroom_id: 1, user_id: userId };
      socket.emit('new_message', newMessageData);

      console.log('Sent new message:', newMessageData);

      setMessages((prevMessages) => [...prevMessages, newMessageData]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <div>
        <h2>Chatroom</h2>
        <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
          {messages.map((message, index) => (
            <div key={index}>
              {/* <strong>User ID:</strong> {message.user_id}: */}
              <strong>Message:</strong> {message.message_content}
            </div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatroom;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ChatFriends from './ChatFriends';

// function Chatroom() {
//   const [users, setUsers] = useState([]);
//   const [friends, setFriends] = useState([]);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:5000/users')
//       .then((response) => {
//         setUsers(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching users:', error);
//       });
//   }, []);

//   const handleAddFriend = (userId) => {
//     const newFriend = users.find((user) => user.id === userId);
//     setFriends((prevFriends) => [...prevFriends, newFriend]);

//     const socket = io('http://127.0.0.1:5000');
//     socket.emit('join_chatroom', { userId: newFriend.id });

//     socket.on(`new_message_${newFriend.id}`, (incomingMessage) => {
//       // Update the state with the new message
//       // Assuming you have a setMessages function to update the messages list
//       // setMessages((prevMessages) => [...prevMessages, incomingMessage]);
//     });
//   };

//   return (
//     <div className="bg-blue-500 p-4">
//       <ChatFriends users={users} />
//     </div>
//   );
// }

// export default Chatroom;







// // Chatroom.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ChatFriends from './ChatFriends';  // Assuming the ChatFriends component is in the same directory

// function Chatroom() {
//   const [users, setUsers] = useState([]);
//   const [friends, setFriends] = useState([]);

//   useEffect(() => {
//     // Fetch the list of users when the chatroom component mounts
//     axios.get('http://127.0.0.1:5000/users')
//       .then((response) => {
//         // Update the state with the list of users
//         setUsers(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching users:', error);
//       });
//   }, []);

//   // Modify the handleAddFriend function
//   const handleAddFriend = (userId) => {
//     const newFriend = users.find((user) => user.id === userId);

//     // Assuming you have a function to add a friend to the list
//     // You can modify this logic based on your actual implementation
//     // For now, let's assume you have a setFriends function to update the friends list
//     setFriends((prevFriends) => [...prevFriends, newFriend]);

//     // Connect to the server for sending and receiving messages
//     const socket = io('http://127.0.0.1:5000');

//     // Emit a 'join_chatroom' event to the server with the friend's user id
//     socket.emit('join_chatroom', { userId: newFriend.id });

//     // Listen for incoming messages for the new friend
//     socket.on(`new_message_${newFriend.id}`, (incomingMessage) => {
//       // Update the state with the new message
//       // Assuming you have a setMessages function to update the messages list
//       // setMessages((prevMessages) => [...prevMessages, incomingMessage]);
//     });
//   };

//   return (
//     <div className="bg-blue-500 p-4">
//       <nav className="flex justify-between items-center mb-4">
//         <div className="text-white text-2xl font-bold">Chatwave</div>
//         <div className="flex space-x-4"></div>
//       </nav>

//       <div>
//         <h2 className="text-white text-3xl mb-4">Chatroom</h2>
//         <div>
//           <h3 className="text-white text-xl mb-2">Users in the Chatroom:</h3>
//           {users.map((user) => (
//             <div key={user.id} className="bg-white p-4 mb-2 flex justify-between items-center">
//               <span>{user.username}</span>
//               <button
//                 onClick={() => handleAddFriend(user.id)}
//                 className="bg-blue-500 text-white px-2 py-1 rounded"
//               >
//                 Add Friend
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Include the ChatFriends component */}
//       <ChatFriends />
//     </div>
//   );
// }

// export default Chatroom;




// import React, { useState, useEffect } from 'react';
// import axios from "axios";

// // Chatroom component
// function Chatroom() {
//     const [users, setUsers] = useState([]);
//     const [friends, setFriends] = useState([]);
  
//     useEffect(() => {
//       // Fetch the list of users when the chatroom component mounts
//       axios.get("http://127.0.0.1:5000/users")
//         .then((response) => {
//           // Update the state with the list of users
//           setUsers(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching users:", error);
//         });
//     }, []);
  
//     const handleAddFriend = (userId) => {
//       // Assuming you have a function to add a friend to the list
//       // You can modify this logic based on your actual implementation
//       // For now, let's assume you have a setFriends function to update the friends list
//       setFriends((prevFriends) => [...prevFriends, users.find(user => user.id === userId)]);
//     };
  
//     return (
//       <div className="bg-blue-500 p-4">
//         <nav className="flex justify-between items-center mb-4">
//           <div className="text-white text-2xl font-bold">Chatwave</div>
//           <div className="flex space-x-4">
            
//           </div>
//         </nav>
  
//         <div>
//           <h2 className="text-white text-3xl mb-4">Chatroom</h2>
//           <div>
//             <h3 className="text-white text-xl mb-2">Users in the Chatroom:</h3>
//             {users.map((user) => (
//               <div key={user.id} className="bg-white p-4 mb-2 flex justify-between items-center">
//                 <span>{user.username}</span>
//                 <button
//                   onClick={() => handleAddFriend(user.id)}
//                   className="bg-blue-500 text-white px-2 py-1 rounded"
//                 >
//                   Add Friend
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   export default Chatroom;
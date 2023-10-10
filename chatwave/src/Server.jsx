// // server.js
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Enable CORS for all routes
// app.use(cors());

// // Sample messages data
// const messages = [
//   { id: 1, message_content: 'Hello!' },
//   { id: 2, message_content: 'How are you?' },
// ];

// // Serve the messages when a client connects
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Send the messages to the client when they connect
//   io.emit('messages_retrieved', messages);

//   // Listen for new messages from the client
//   socket.on('new_message', (data) => {
//     // Add the new message to the messages array
//     const newMessage = {
//       id: messages.length + 1,
//       message_content: data.message_content,
//     };
//     messages.push(newMessage);

//     // Broadcast the new message to all connected clients
//     io.emit('new_message', newMessage);
//   });

//   // Clean up on disconnect
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// server.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });

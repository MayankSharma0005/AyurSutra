// server.js
require('dotenv').config();
require('./jobs/reminderJob');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// static upload folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes (you'll implement these route files)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/prescriptions', require('./routes/prescriptions'));
app.use('/api/payments', require('./routes/payments'));

// socket.io for real-time chat
io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
  });

  socket.on('sendMessage', (msg) => {
    // msg: { roomId, from, to, content }
    io.to(msg.roomId).emit('receiveMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
  });
});

// connect to DB & start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('MongoDB connected');
    server.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.error(err));

import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import path from 'path';
import { Server } from 'socket.io';
import { setupSocket } from './sockets/chat-socket';
import mediaRoutes from './routes/media-routes';
import chatRoutes from './routes/chat-routes';
import appointmentRoutes from './routes/appointment-routes';
import adminRoutes from './routes/admin-routes';
import staffRoutes from './routes/staff-routes';
import { getToken } from './controllers/get-token';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

setupSocket(io);

mongoose.connect('mongodb://admin:secret@localhost:27017').then(() => {
  console.log('MongoDB connected');

  app.use(express.json());
  const uploadPath = path.resolve(__dirname, '../uploads'); // make it absolute
  app.use('/uploads', express.static(uploadPath));
  app.use('/api/media', mediaRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/appointments', appointmentRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/staff', staffRoutes);
  app.post('/api/get-token', getToken )
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
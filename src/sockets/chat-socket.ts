import { Server } from "socket.io";
import Message from "../models/message";
import chatRoom from "../models/chat-room";
import { JWT_SECRET } from "../controllers/get-token";
import jwt from 'jsonwebtoken'

export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    const token = socket.handshake.query.token as string;

    const decoded = jwt.verify(token, JWT_SECRET)
    const userId = decoded.userId

    console.log("New connection from userId:", userId);

    // Log everything that comes in
    socket.onAny((event, data) => {
      console.log(`🟢 Event: ${event}`, data);
    });

    
socket.on("joinRoom", async ({ roomId }) => {
  if (!roomId) return console.error("⚠️ No roomId provided");

  try {
    const room = await chatRoom.findById(roomId).lean();

    if (!room) {
      console.error("❌ Room not found");
      return socket.emit("error", "Room not found");
    }

    if( room.status !== 'active'){
        console.log("Room is not active");
        return socket.emit("error", "room is not active")
    } 

    // assuming room.assigned is an array of ObjectIds or strings
    const isAssigned = room.assigned && room.assigned.toString() === userId;

    const isPetOwner = room.petOwnerId.toString() === userId;

    if (!isAssigned && !isPetOwner) {
      console.warn(`❌ User ${userId} is not assigned to room ${roomId}`);
      return socket.emit("unauthorized", "You are not allowed in this room");
    }

    socket.join(roomId);
        console.log(`✅ User ${userId} joined room ${roomId}`);
    } catch (err) {
        console.error("❌ Error verifying room join", err);
        socket.emit("error", "Internal server error");
    }
    });

    socket.on("message", async ({ roomId, content, type }) => {
      if (!roomId || !content) {
        console.error("⚠️ Missing roomId or content");
        return;
      }

      const msg = await Message.create({
        senderId: userId,
        chatRoomId: roomId,
        content,
        type,
      });

      console.log(`📩 Message from ${userId} to room ${roomId}: ${content}`);

      io.to(roomId).emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log(`🔌 User ${userId} disconnected`);
    });
  });
};
    
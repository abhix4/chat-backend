import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: String,
  chatRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' },
  content: String,
  type: { type: String, enum: ['text', 'video', 'doc'], default: 'text' },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Message', messageSchema);

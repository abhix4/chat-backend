import mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
  appointmentId: String,
  petOwnerId: String,
  hospitalId: String,
  assigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant' },
  status: { type: String, enum: ['active', 'archived', 'closed'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('ChatRoom', chatRoomSchema);

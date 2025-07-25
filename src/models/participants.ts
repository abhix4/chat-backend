import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  userId: String,
  role: { type: String, enum: ['admin', 'staff', 'petOwner'] },
  chatRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' },
});

export default mongoose.model('Participant', participantSchema);

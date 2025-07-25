import ChatRoom from '../models/chat-room';
import message from '../models/message';

export const createChatRoom = async (req, res) => {
  const { appointmentId, petOwnerId, hospitalId } = req.body;
  const room = await ChatRoom.create({ appointmentId, petOwnerId, hospitalId });
  res.status(201).json(room);
};

export const archiveChat = async (req, res) => {
  const room = await ChatRoom.findByIdAndUpdate(req.params.roomId, { status: 'archived' }, { new: true });
  res.json(room);
};

export const chatHistory = async (req,res) => {
    const {roomId} = req.body;
    const messages = await message.find({chatRoomId : roomId});
    res.status(200).json(messages)
}
import chatRoom from "../models/chat-room"
import participants from "../models/participants"


export const assignedChatRooms = async (req, res) => {
  try {
    const {staffId} = req.body;
    const chatRooms = await chatRoom.find({ status: 'active', assigned: staffId}).populate('assigned');

    return res.status(200).json({
      message: ' chat rooms fetched successfully',
      data: chatRooms,
    });
  } catch (error) {
    console.error('Error fetching  chat rooms:', error);
    return res.status(500).json({
      message: 'Failed to fetch  chat rooms',
    });
  }
};
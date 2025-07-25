import chatRoom from "../models/chat-room"
import participants from "../models/participants"


export const activeChatRooms = async (req, res) => {
  try {
    const chatRooms = await chatRoom.find({ status: 'active' }).populate('assigned');

    return res.status(200).json({
      message: 'Active chat rooms fetched successfully',
      data: chatRooms,
    });
  } catch (error) {
    console.error('Error fetching active chat rooms:', error);
    return res.status(500).json({
      message: 'Failed to fetch active chat rooms',
    });
  }
};

export const assignChat = async (req,res) => {
     try {
    const { staffId, chatRoomId } = req.body;

    
    const room = (await chatRoom.findById(chatRoomId))
    if (!room) {
      return res.status(404).json({ message: 'Chat room not found' });
    }


    const existingParticipant = await participants.findOne({
      chatRoomId,
      userId: staffId,
    });

    if (!existingParticipant) {
      const staff = await participants.create({
        userId: staffId,
        chatRoomId,
        role: 'staff', 
      });
       room.assigned = staff._id;
       await room.save();
    }
    
    
    const updatedRoom = await chatRoom.findById(chatRoomId).populate('assigned');
    return res.status(200).json({
    message: 'Chat successfully assigned to staff',
    chatRoom: updatedRoom,
    });
  } catch (error) {
    console.error('Assign Chat Error:', error);
    return res.status(500).json({
      message: 'Failed to assign chat',
    });
  }
}
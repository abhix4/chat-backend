// src/controllers/appointmentController.ts
import Appointment from '../models/appointment';
import ChatRoom from '../models/chat-room';
import Participant from '../models/participants';

export const bookAppointment = async (req, res) => {
  try {
    const { petOwnerId, hospitalId, time } = req.body;

    const appointment = await Appointment.create({ petOwnerId, hospitalId, time, status: 'confirmed' });

    // Create ChatRoom
    const chatRoom = await ChatRoom.create({
      appointmentId: appointment._id,
      petOwnerId,
      hospitalId,
    });

    // Add Participants
    await Participant.create([
      { userId: petOwnerId, role: 'petOwner', chatRoomId: chatRoom._id },
      { userId: 'test', role: 'staff', chatRoomId: chatRoom._id },
    ]);

    res.status(201).json({ appointment, chatRoomId: chatRoom._id });
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ message: 'Failed to book appointment' });
  }
};


export const completeAppointment = async (req, res) => {
  try {
    const { appointmentId} = req.body;

    const appointment = await Appointment.findById(appointmentId);

    appointment.status = 'completed'
    await appointment.save()
    // Create ChatRoom
    const chatRoom = await ChatRoom.findOne({appointmentId: appointment._id});

    chatRoom.status = 'closed';
    await chatRoom.save();

    

    res.status(201).json({ appointment, chatRoomId: chatRoom._id });
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ message: 'Failed to book appointment' });
  }
};

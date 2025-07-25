
import cron from 'node-cron';
import Appointment from './models/appointment';
import ChatRoom from './models/chat-room';

cron.schedule('* * * * *', async () => {
  console.log('Checking for expired chat rooms...');

  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48 hours ago

  try {
    const appointments = await Appointment.find({
      status: 'completed',
      completedAt: { $lte: cutoff },
    });

    console.log(`Found ${appointments.length} completed appointments older than 48 hours.`);

    for (const appointment of appointments) {
      const chatRoom = await ChatRoom.findOne({
        appointmentId: appointment._id,
        status: { $ne: 'closed' },
      });

      if (chatRoom) {
        chatRoom.status = 'closed';
        await chatRoom.save();
        console.log(`Closed ChatRoom: ${chatRoom._id}`);
      }
    }
    console.log('Expired chat rooms closed successfully.');
  } catch (err) {
    console.error('Error closing chat rooms:', err);
  }
});

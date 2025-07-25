// src/models/Appointment.ts
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  petOwnerId: String,
  hospitalId: String,
  time: Date,
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
});

export default mongoose.model('Appointment', appointmentSchema);

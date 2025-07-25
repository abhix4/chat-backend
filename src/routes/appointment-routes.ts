import express from 'express';
import { bookAppointment } from '../controllers/appointment-controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/book',authenticate, bookAppointment);

export default router;

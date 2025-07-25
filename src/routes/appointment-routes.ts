import express from 'express';
import { bookAppointment, completeAppointment } from '../controllers/appointment-controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/book',authenticate, bookAppointment);
router.post('/complete', completeAppointment)

export default router;

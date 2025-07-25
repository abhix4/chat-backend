import express from 'express';
import { assignedChatRooms } from '../controllers/staff-controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/assigned',authenticate, assignedChatRooms);

export default router;

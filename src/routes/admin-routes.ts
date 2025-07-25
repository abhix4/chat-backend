import express from 'express';
import { activeChatRooms, assignChat } from '../controllers/admin-controller';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/active-chats', authenticate, activeChatRooms);
router.post('/assign', authenticate, assignChat);


export default router;

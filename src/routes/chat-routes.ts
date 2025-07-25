import express from 'express';
import { createChatRoom, archiveChat, chatHistory } from '../controllers/chat-controller';
import { authenticate } from '../middleware/auth';


const router = express.Router();

router.post('/create',authenticate, createChatRoom);
router.post('/history',authenticate, chatHistory);
router.post('/:roomId/archive',authenticate, archiveChat);

export default router;

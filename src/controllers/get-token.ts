import ChatRoom from '../models/chat-room';
import jwt from 'jsonwebtoken'


export const JWT_SECRET = 'foso43ur-i3jgiprjg'
export const getToken = async (req, res) => {
  const { userId } = req.body;

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(201).json({ token });
};
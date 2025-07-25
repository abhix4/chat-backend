import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../controllers/get-token';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Get the token after "Bearer"

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
   
    next();
  } catch (err) {
    console.error("Invalid token:", err.message);
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

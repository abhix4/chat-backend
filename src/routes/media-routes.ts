import express from 'express';
import multer from 'multer';
import { uploadMedia } from '../controllers/media-controller';
import { authenticate } from '../middleware/auth';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });
const router = express.Router();

router.post('/upload', upload.single('file'), uploadMedia);

export default router;

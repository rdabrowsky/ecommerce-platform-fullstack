import express from 'express';
import path from 'path';
import multer from 'multer';

import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.filename}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image uploaded',
    image: `/${req.file.path}`,
  });
});
export default router;

import { Response } from 'express';
import { AuthRequest } from '../types/auth';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Конфигурация multer для загрузки изображений
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.query.type || 'common';
    const uploadDir = path.resolve(__dirname, `../../uploads/${type}`);
    
    // Создаем директорию, если её нет
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Неподдерживаемый формат файла. Разрешены только JPEG, PNG, GIF и WEBP'));
  }
};

export const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

export const uploadImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Файл не загружен' });
    }

    const type = req.query.type || 'common';
    const imageUrl = `/uploads/${type}/${req.file.filename}`;
    
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при загрузке изображения' });
  }
}; 
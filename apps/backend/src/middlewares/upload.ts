import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Конфигурация путей для разных типов загрузок
const UPLOAD_DIRS = {
  avatars: path.resolve(__dirname, '../../uploads/avatars'),
  events: path.resolve(__dirname, '../../uploads/events'),
  news: path.resolve(__dirname, '../../uploads/news'),
  temp: path.resolve(__dirname, '../../uploads/temp')
} as const;

type UploadType = keyof typeof UPLOAD_DIRS;

// Создаем директории если они не существуют
Object.values(UPLOAD_DIRS).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Разрешенные типы файлов
const ALLOWED_MIME_TYPES: Record<string, boolean> = {
  'image/jpeg': true,
  'image/png': true,
  'image/webp': true
};

// Конфигурация размеров для разных типов изображений
const IMAGE_SIZES = {
  avatars: {
    width: 200,
    height: 200,
    quality: 80
  },
  events: {
    width: 800,
    height: 600,
    quality: 85
  },
  news: {
    width: 1200,
    height: 800,
    quality: 85
  }
} as const;

// Генерация уникального имени файла
const generateUniqueFilename = (originalname: string) => {
  const ext = path.extname(originalname);
  return `${uuidv4()}${ext}`;
};

// Обработка изображения
const processImage = async (file: Express.Multer.File, type: UploadType) => {
  const config = IMAGE_SIZES[type];
  const filename = generateUniqueFilename(file.originalname);
  const outputPath = path.join(UPLOAD_DIRS[type], filename);

  await sharp(file.path)
    .resize(config.width, config.height, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality: config.quality })
    .toFile(outputPath);

  // Удаляем временный файл
  fs.unlinkSync(file.path);

  return filename;
};

// Настройка хранилища
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIRS.temp);
  },
  filename: (req, file, cb) => {
    cb(null, generateUniqueFilename(file.originalname));
  }
});

// Фильтр файлов
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (ALLOWED_MIME_TYPES[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('Неподдерживаемый тип файла. Разрешены только JPEG, PNG и WebP.'));
  }
};

// Основной middleware для загрузки
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    fieldSize: 10 * 1024 * 1024 // 10MB
  }
});

// Middleware для обработки загруженного изображения
export const processUploadedImage = (type: UploadType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return next();
      }

      const filename = await processImage(req.file, type);
      req.file.filename = filename;
      req.file.path = path.join(UPLOAD_DIRS[type], filename);
      
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Функция для очистки старых файлов
export const cleanupOldFiles = async (type: UploadType, maxAge: number = 7 * 24 * 60 * 60 * 1000) => {
  const dir = UPLOAD_DIRS[type];
  const files = fs.readdirSync(dir);
  const now = Date.now();

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    const age = now - stats.mtimeMs;

    if (age > maxAge) {
      fs.unlinkSync(filePath);
    }
  }
};

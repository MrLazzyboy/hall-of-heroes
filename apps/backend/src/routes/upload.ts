import { Router, RequestHandler } from 'express';
import { upload, uploadImage } from '../controllers/upload';
import { authMiddleware } from '../middlewares/auth';
import { isAdmin } from '../middlewares/roles';

const router = Router();

// Универсальный эндпоинт для загрузки изображений
router.post(
  '/image',
  authMiddleware as RequestHandler,
  upload.single('image'),
  uploadImage as RequestHandler
);

// Эндпоинт для загрузки изображений администратором
router.post(
  '/admin/image',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  upload.single('image'),
  uploadImage as RequestHandler
);

export default router; 
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.ts';
import { upload, processUploadedImage } from '../middlewares/upload.ts';
import {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  getUserById,
  getUserNotifications,
  uploadAvatar
} from '../controllers/user.ts';

const router = Router();

// Маршруты, требующие аутентификации
router.use(authMiddleware);

// Получение текущего пользователя
router.get('/me', getCurrentUser);

// Обновление текущего пользователя
router.put('/me', updateCurrentUser);

// Удаление текущего пользователя
router.delete('/me', deleteCurrentUser);

// Загрузка аватара
router.post('/me/avatar', 
  upload.single('avatar'),
  processUploadedImage('avatars'),
  uploadAvatar
);

// Получение пользователя по ID
router.get('/:id', getUserById);

// Получение уведомлений пользователя
router.get('/me/notifications', getUserNotifications);

export default router;

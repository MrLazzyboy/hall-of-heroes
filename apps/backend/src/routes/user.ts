import { Router } from 'express';
import {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  getUserById,
  getUserNotifications,
  uploadAvatar,
} from '../controllers/user';
import { authMiddleware } from '../middlewares/auth';
import { upload } from '../middlewares/upload';

const router = Router();

router.get('/me', authMiddleware, getCurrentUser);
router.patch('/me', authMiddleware, updateCurrentUser);
router.delete('/me', authMiddleware, deleteCurrentUser);
router.get('/:id', authMiddleware, getUserById);
router.get('/me/notifications', authMiddleware, getUserNotifications);
router.post('/me/avatar', authMiddleware, upload.single('file'), uploadAvatar);

export default router;

import { Router } from 'express';
import {
  blockUser,
  unblockUser,
  addFilter,
  createNews,
  updateNews,
  deleteNews,
  approveEvent,
  rejectEvent,
} from '../controllers/admin';
import { authMiddleware } from '../middlewares/auth';
import { isAdmin } from '../middlewares/roles';

const router = Router();

// Роуты для управления событиями
router.post('/events/:id/approve', authMiddleware, isAdmin, approveEvent);
router.post('/events/:id/reject', authMiddleware, isAdmin, rejectEvent);

// Роуты для управления пользователями
router.patch('/users/:id/block', authMiddleware, isAdmin, blockUser);
router.patch('/users/:id/unblock', authMiddleware, isAdmin, unblockUser);

// Роут для добавления фильтра
router.post('/filters', authMiddleware, isAdmin, addFilter);

// Роуты для управления новостями
router.post('/news', authMiddleware, isAdmin, createNews);
router.put('/news/:id', authMiddleware, isAdmin, updateNews);
router.delete('/news/:id', authMiddleware, isAdmin, deleteNews);

export default router;

import { Router, RequestHandler } from 'express';
import {
  getAllUsers,
  blockUser,
  unblockUser,
  approveEvent,
  rejectEvent,
  createNews,
  updateNews,
  deleteNews,
  addFilter,
  updateFilter,
  deleteFilter
} from '../controllers/admin';
import { authMiddleware } from '../middlewares/auth';
import { isAdmin } from '../middlewares/roles';

const router = Router();

// Получение всех пользователей
router.get(
  '/users',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  getAllUsers as RequestHandler
);

// Блокировка пользователя
router.patch(
  '/users/:id/block',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  blockUser as RequestHandler
);

// Разблокировка пользователя
router.patch(
  '/users/:id/unblock',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  unblockUser as RequestHandler
);

// Одобрение события
router.post(
  '/events/:id/approve',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  approveEvent as RequestHandler
);

// Отклонение события
router.post(
  '/events/:id/reject',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  rejectEvent as RequestHandler
);

// Создание новости
router.post(
  '/news',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  createNews as RequestHandler
);

// Обновление новости
router.put(
  '/news/:id',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  updateNews as RequestHandler
);

// Удаление новости
router.delete(
  '/news/:id',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  deleteNews as RequestHandler
);

// Добавление фильтра
router.post(
  '/filters',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  addFilter as RequestHandler
);

// Обновление фильтра
router.put(
  '/filters/:id',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  updateFilter as RequestHandler
);

// Удаление фильтра
router.delete(
  '/filters/:id',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  deleteFilter as RequestHandler
);

export default router;

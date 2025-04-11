import { Router, RequestHandler } from 'express';
import {
  blockUser,
  unblockUser,
  addFilter,
  createNews,
  updateNews,
  deleteNews,
  approveEvent,
  rejectEvent,
  getAllUsers,
} from '../controllers/admin.ts';
import { authMiddleware } from '../middlewares/auth.ts';
import { isAdmin } from '../middlewares/roles.ts';

const router = Router();

// Роуты для управления событиями
router.post(
  '/events/:id/approve',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  approveEvent as RequestHandler
);
router.post(
  '/events/:id/reject',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  rejectEvent as RequestHandler
);

// Роуты для управления пользователями
router.get(
  '/users',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  getAllUsers as RequestHandler
);
router.patch(
  '/users/:id/block',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  blockUser as RequestHandler
);
router.patch(
  '/users/:id/unblock',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  unblockUser as RequestHandler
);

// Роут для добавления фильтра
router.post(
  '/filters',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  addFilter as RequestHandler
);

// Роуты для управления новостями
router.post(
  '/news',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  createNews as RequestHandler
);
router.put(
  '/news/:id',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  updateNews as RequestHandler
);
router.delete(
  '/news/:id',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  deleteNews as RequestHandler
);

export default router;

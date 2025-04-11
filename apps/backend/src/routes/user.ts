import { Router, RequestHandler } from 'express';
import {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  getUserById,
  getUserNotifications,
  uploadAvatar,
} from '../controllers/user.ts';
import { authMiddleware } from '../middlewares/auth.ts';
import { upload } from '../middlewares/upload.ts';

const router = Router();

router.get(
  '/me',
  authMiddleware as RequestHandler,
  getCurrentUser as RequestHandler
);
router.patch(
  '/me',
  authMiddleware as RequestHandler,
  updateCurrentUser as RequestHandler
);
router.delete(
  '/me',
  authMiddleware as RequestHandler,
  deleteCurrentUser as RequestHandler
);
router.get(
  '/:id',
  authMiddleware as RequestHandler,
  getUserById as RequestHandler
);
router.get(
  '/me/notifications',
  authMiddleware as RequestHandler,
  getUserNotifications as RequestHandler
);
router.post(
  '/me/avatar',
  authMiddleware as RequestHandler,
  upload.single('file'),
  uploadAvatar as RequestHandler
);

export default router;

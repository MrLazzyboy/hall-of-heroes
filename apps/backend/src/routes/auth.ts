import { Router, RequestHandler } from 'express';
import {
  register,
  login,
  logout,
  session,
  updateRole,
} from '../controllers/auth';
import { loginLimiter, registerLimiter } from '../middlewares/rateLimiters';
import { authMiddleware } from '../middlewares/auth';
import { isAdmin } from '../middlewares/roles';

const router = Router();

// Приведение функций к `RequestHandler`
router.post('/register', registerLimiter, register as RequestHandler);
router.post('/login', loginLimiter, login as RequestHandler);
router.delete(
  '/session',
  authMiddleware as RequestHandler,
  logout as RequestHandler
);
router.get(
  '/session',
  authMiddleware as RequestHandler,
  session as RequestHandler
);
router.patch(
  '/role',
  authMiddleware as RequestHandler,
  isAdmin as RequestHandler,
  updateRole as RequestHandler
);

export default router;

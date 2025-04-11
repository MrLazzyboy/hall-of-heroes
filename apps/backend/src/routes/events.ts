import { Router, RequestHandler } from 'express';
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  inviteToEvent,
  acceptInvitation,
  rejectInvitation,
  getAllPublicEvents,
} from '../controllers/event';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Получение всех публичных событий (без авторизации)
router.get('/all', getAllPublicEvents as RequestHandler);

// Получение всех событий пользователя
router.get('/', authMiddleware as RequestHandler, getEvents as RequestHandler);

// Создание нового события
router.post(
  '/',
  authMiddleware as RequestHandler,
  createEvent as RequestHandler
);

// Получение конкретного события
router.get(
  '/:id',
  authMiddleware as RequestHandler,
  getEvent as RequestHandler
);

// Обновление события
router.put(
  '/:id',
  authMiddleware as RequestHandler,
  updateEvent as RequestHandler
);

// Удаление события
router.delete(
  '/:id',
  authMiddleware as RequestHandler,
  deleteEvent as RequestHandler
);

// Приглашение пользователя на событие
router.post(
  '/:id/invite',
  authMiddleware as RequestHandler,
  inviteToEvent as RequestHandler
);

// Принятие приглашения
router.post(
  '/:id/accept',
  authMiddleware as RequestHandler,
  acceptInvitation as RequestHandler
);

// Отклонение приглашения
router.post(
  '/:id/reject',
  authMiddleware as RequestHandler,
  rejectInvitation as RequestHandler
);

export default router;

import { Router, RequestHandler } from 'express';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getEvents,
  getAllPublicEvents,
  applyForEvent,
  searchUsers,
  approvePlayer,
  rejectPlayer,
  closeRegistration,
  getEventApplications,
  openRegistration
} from '../controllers/event';
import { authMiddleware } from '../middlewares/auth';
import { isMaster } from '../middlewares/roles';

const router = Router();

// Создание события
router.post(
  '/',
  authMiddleware as RequestHandler,
  createEvent as RequestHandler
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

// Получение всех публичных событий
router.get(
  '/all',
  getAllPublicEvents as RequestHandler
);

// Получение события по ID
router.get(
  '/:id',
  getEvent as RequestHandler
);

// Получение событий пользователя
router.get(
  '/',
  authMiddleware as RequestHandler,
  getEvents as RequestHandler
);

// Подача заявки на участие в событии
router.post(
  '/:id/apply',
  authMiddleware as RequestHandler,
  applyForEvent as RequestHandler
);

// Поиск пользователей
router.get(
  '/search/users',
  authMiddleware as RequestHandler,
  searchUsers as RequestHandler
);

// Получение списка заявок на событие (для мастера)
router.get(
  '/:id/applications',
  authMiddleware as RequestHandler,
  isMaster as RequestHandler,
  getEventApplications as RequestHandler
);

// Одобрение игрока (для мастера)
router.post(
  '/:id/approve-player',
  authMiddleware as RequestHandler,
  isMaster as RequestHandler,
  approvePlayer as RequestHandler
);

// Отклонение игрока (для мастера)
router.post(
  '/:id/reject-player',
  authMiddleware as RequestHandler,
  isMaster as RequestHandler,
  rejectPlayer as RequestHandler
);

// Закрытие записи (для мастера)
router.post(
  '/:id/close-registration',
  authMiddleware as RequestHandler,
  isMaster as RequestHandler,
  closeRegistration as RequestHandler
);

// Открытие записи (для мастера)
router.post(
  '/:id/open-registration',
  authMiddleware as RequestHandler,
  isMaster as RequestHandler,
  openRegistration as RequestHandler
);

export default router;

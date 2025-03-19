import { Router } from 'express';
import {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  getUserEvents,
  respondToInvitation,
} from '../controllers/events.ts';
import { authMiddleware } from '../middlewares/auth.ts';

const router = Router();

// Список всех событий
router.get('/', getAllEvents);

// Создание нового события (только для авторизованных пользователей)
router.post('/', authMiddleware, createEvent);

// Получение информации о конкретном событии
router.get('/:id', authMiddleware, getEventById);

// Редактирование события (только автор события)
router.put('/:id', authMiddleware, updateEvent);

// Удаление события (только автор события)
router.delete('/:id', authMiddleware, deleteEvent);

// Получение событий конкретного пользователя
router.get('/users/:id/events', getUserEvents);

// Ответ на приглашение (только приглашенные пользователи)
router.post('/:id/invitation-response', authMiddleware, respondToInvitation);

export default router;

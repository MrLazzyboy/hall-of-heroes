import { Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { AuthRequest } from '../types/auth';
import Event from '../models/event';
import { ApiError } from '../middlewares/errorHandler';

// Получение всех событий
export const getAllEvents = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const events = await Event.find()
      .skip((+page - 1) * +limit)
      .limit(+limit);
    res.status(200).json({ events });
  } catch (error) {
    next(error);
  }
};

// Создание нового события
export const createEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, date, invitations } = req.body;

    if (!req.user?.userId) throw new ApiError(401, 'Необходима авторизация');

    const creatorId = new mongoose.Types.ObjectId(req.user.userId); // Конвертируем userId

    const newEvent = new Event({
      title,
      description,
      date,
      creator: creatorId,
      participants: [creatorId],
      invitations:
        invitations?.map((id: string) => new mongoose.Types.ObjectId(id)) || [],
    });

    await newEvent.save();
    res
      .status(201)
      .json({ id: newEvent._id, message: 'Событие успешно создано' });
  } catch (error) {
    next(error);
  }
};

// Получение информации о конкретном событии
export const getEventById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate('creator', 'username');
    if (!event) throw new ApiError(404, 'Событие не найдено');

    // Проверяем, авторизован ли пользователь
    if (!req.user?.userId) {
      throw new ApiError(401, 'Необходима авторизация');
    }

    // Конвертируем userId в ObjectId
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    // Проверяем, имеет ли пользователь доступ к событию
    if (
      !event.participants.some((participant) => participant.equals(userId)) &&
      !event.creator.equals(userId)
    ) {
      throw new ApiError(403, 'Вы не можете просматривать это событие');
    }

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

// Редактирование события
export const updateEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;
    const event = await Event.findById(id);
    if (!event) throw new ApiError(404, 'Событие не найдено');

    if (event.creator.toString() !== req.user?.userId)
      throw new ApiError(403, 'Недостаточно прав');

    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;

    await event.save();
    res.status(200).json({ message: 'Событие успешно обновлено' });
  } catch (error) {
    next(error);
  }
};

// Удаление события
export const deleteEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) throw new ApiError(404, 'Событие не найдено');

    if (event.creator.toString() !== req.user?.userId)
      throw new ApiError(403, 'Недостаточно прав');

    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: 'Событие успешно удалено' });
  } catch (error) {
    next(error);
  }
};

// Получение событий конкретного пользователя
export const getUserEvents = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const events = await Event.find({ creator: id });
    res.status(200).json({ events });
  } catch (error) {
    next(error);
  }
};

// Ответ на приглашение
export const respondToInvitation = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?.userId) throw new ApiError(401, 'Необходима авторизация');

    const userId = new mongoose.Types.ObjectId(req.user.userId); // Конвертация userId
    const { id } = req.params;
    const { status } = req.body;

    const event = await Event.findById(id);
    if (!event) throw new ApiError(404, 'Событие не найдено');

    if (!event.invitations.some((invitedId) => invitedId.equals(userId))) {
      throw new ApiError(403, 'Вы не приглашены в это событие');
    }

    if (
      status === 'accept' &&
      !event.participants.some((p) => p.equals(userId))
    ) {
      event.participants.push(userId);
    }

    event.invitations = event.invitations.filter(
      (invitedId) => !invitedId.equals(userId)
    );
    await event.save();

    res.status(200).json({ message: 'Ответ на приглашение успешно сохранен' });
  } catch (error) {
    next(error);
  }
};

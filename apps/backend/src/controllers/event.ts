import { Request, Response } from 'express';
import EventModel from '../models/event';
import { AuthRequest } from '../types/auth';
import { Types } from 'mongoose';

export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, date } = req.body;
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    if (!title || !description || !date) {
      return res.status(400).json({ message: 'Необходимо указать заголовок, описание и дату события' });
    }

    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({ message: 'Неверный формат даты' });
    }

    const event = new EventModel({
      title,
      description,
      date: eventDate,
      creator: new Types.ObjectId(user._id.toString()),
      participants: [new Types.ObjectId(user._id.toString())],
      status: 'pending',
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании события' });
  }
};

export const getEvents = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const userId = new Types.ObjectId(user._id.toString());
    const events = await EventModel.find({
      $or: [
        { creator: userId },
        { participants: userId },
        { invitations: userId },
      ],
    }).populate('creator participants invitations');

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении событий' });
  }
};

export const getEvent = async (req: AuthRequest, res: Response) => {
  try {
    const event = await EventModel.findById(req.params.id).populate(
      'creator participants invitations'
    );
    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении события' });
  }
};

export const updateEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, date, status } = req.body;
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    const userId = new Types.ObjectId(user._id.toString());
    if (event.creator.toString() !== userId.toString() && user.role !== 'Admin') {
      return res.status(403).json({ message: 'Нет прав для редактирования события' });
    }

    if (date) {
      const eventDate = new Date(date);
      if (isNaN(eventDate.getTime())) {
        return res.status(400).json({ message: 'Неверный формат даты' });
      }
      event.date = eventDate;
    }

    event.title = title || event.title;
    event.description = description || event.description;
    if (user.role === 'Admin') {
      event.status = status || event.status;
    }

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении события' });
  }
};

export const deleteEvent = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    const userId = new Types.ObjectId(user._id.toString());
    if (event.creator.toString() !== userId.toString() && user.role !== 'Admin') {
      return res.status(403).json({ message: 'Нет прав для удаления события' });
    }

    await event.deleteOne();
    res.json({ message: 'Событие успешно удалено' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении события' });
  }
};

export const inviteToEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.body;
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    const creatorId = new Types.ObjectId(user._id.toString());
    if (event.creator.toString() !== creatorId.toString()) {
      return res.status(403).json({ message: 'Нет прав для приглашения участников' });
    }

    const invitedUserId = new Types.ObjectId(userId);
    if (event.invitations.includes(invitedUserId)) {
      return res.status(400).json({ message: 'Пользователь уже приглашен' });
    }

    event.invitations.push(invitedUserId);
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при приглашении участника' });
  }
};

export const acceptInvitation = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    const userId = new Types.ObjectId(user._id.toString());
    if (!event.invitations.includes(userId)) {
      return res.status(400).json({ message: 'Вы не приглашены на это событие' });
    }

    if (event.participants.includes(userId)) {
      return res.status(400).json({ message: 'Вы уже являетесь участником этого события' });
    }

    event.invitations = event.invitations.filter(
      (id) => id.toString() !== userId.toString()
    );
    event.participants.push(userId);
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при принятии приглашения' });
  }
};

export const rejectInvitation = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    const userId = new Types.ObjectId(user._id.toString());
    if (!event.invitations.includes(userId)) {
      return res.status(400).json({ message: 'Вы не приглашены на это событие' });
    }

    event.invitations = event.invitations.filter(
      (id) => id.toString() !== userId.toString()
    );
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при отклонении приглашения' });
  }
}; 
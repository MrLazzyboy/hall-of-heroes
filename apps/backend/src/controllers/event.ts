import { Request, Response } from 'express';
import EventModel from '../models/event';
import UserModel from '../models/user';
import { AuthRequest } from '../types/auth';
import { Types } from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Конфигурация multer для загрузки изображений
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/events';
    // Создаем директорию, если её нет
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Неподдерживаемый формат файла. Разрешены только JPEG, PNG, GIF и WEBP'));
  }
};

export const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

export const uploadEventImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Файл не загружен' });
    }

    const imageUrl = `/uploads/events/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при загрузке изображения' });
  }
};

// Поиск пользователей
export const searchUsers = async (req: AuthRequest, res: Response) => {
  try {
    const { query, role } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Необходимо указать строку для поиска' });
    }

    // Формируем условия поиска
    const searchConditions: any = {
      username: { $regex: query as string, $options: 'i' }
    };

    // Добавляем фильтр по роли, если указана
    if (role) {
      searchConditions.role = role;
    }

    const users = await UserModel.find(searchConditions)
      .select('username email avatar rating role') // Выбираем нужные поля
      .limit(10); // Ограничиваем количество результатов

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при поиске пользователей' });
  }
};

export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      shortDescription,
      description,
      organizerInfo,
      format,
      master, // ID мастера
      system,
      setting,
      duration,
      playerExperience,
      genre,
      characterLevel,
      imageUrl,
      date,
      startTime,
      endTime,
      location,
      price,
      discount,
      maxParticipants,
      isPrivate,
    } = req.body;
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    // Базовая валидация обязательных полей
    if (
      !title ||
      !shortDescription ||
      !description ||
      !format ||
      !date ||
      !startTime ||
      !endTime ||
      !location ||
      price === undefined ||
      !maxParticipants
    ) {
      return res
        .status(400)
        .json({ message: 'Не все обязательные поля заполнены' });
    }

    // Дополнительная валидация для игровой сессии
    if (format === 'Игровая сессия') {
      if (!system || !setting || !duration || !playerExperience || !genre || !characterLevel || !master) {
        return res
          .status(400)
          .json({ message: 'Не все обязательные поля для игровой сессии заполнены' });
      }

      // Проверяем существование мастера
      const masterUser = await UserModel.findOne({ _id: master, role: 'Master' });
      if (!masterUser) {
        return res.status(400).json({ message: 'Указанный мастер не найден' });
      }
    }

    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({ message: 'Неверный формат даты' });
    }

    const event = new EventModel({
      title,
      shortDescription,
      description,
      organizerInfo,
      format,
      master: format === 'Игровая сессия' ? new Types.ObjectId(master) : undefined,
      system,
      setting,
      duration,
      playerExperience,
      genre,
      characterLevel,
      imageUrl,
      date: eventDate,
      startTime,
      endTime,
      location,
      price,
      discount: discount || 0,
      maxParticipants,
      isPrivate: isPrivate || false,
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
    const event = await EventModel.findById(req.params.id)
      .populate('creator', 'username email')
      .populate('participants', 'username email')
      .populate('invitations', 'username email');

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    const user = req.user;
    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const userId = new Types.ObjectId(user._id.toString());
    const isParticipant = event.participants.some(p => p._id.equals(userId));
    const isCreator = event.creator._id.equals(userId);
    const isInvited = event.invitations.some(i => i._id.equals(userId));

    if (event.isPrivate && !isParticipant && !isCreator && !isInvited && user.role !== 'Admin') {
      return res.status(403).json({ message: 'У вас нет доступа к этому событию' });
    }

    const response = {
      id: event._id,
      title: event.title,
      shortDescription: event.shortDescription,
      description: event.description,
      organizerInfo: event.organizerInfo,
      format: event.format,
      imageUrl: event.imageUrl,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      price: event.price,
      discount: event.discount,
      maxParticipants: event.maxParticipants,
      currentParticipants: event.participants.length,
      isPrivate: event.isPrivate,
      status: event.status,
      creator: event.creator,
      participants: event.participants,
      invitations: event.invitations,
      ...(event.format === 'Игровая сессия' && {
        system: event.system,
        setting: event.setting,
        duration: event.duration,
        playerExperience: event.playerExperience,
        genre: event.genre,
        characterLevel: event.characterLevel
      }),
      userAccess: {
        isCreator,
        isParticipant,
        isInvited,
        canEdit: isCreator || user.role === 'Admin',
        canInvite: isCreator && event.isPrivate,
        canJoin: !isParticipant && !isInvited && event.participants.length < event.maxParticipants
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении события' });
  }
};

export const updateEvent = async (req: AuthRequest, res: Response) => {
  try {
    const {
      title,
      shortDescription,
      description,
      organizerInfo,
      imageUrl,
      date,
      startTime,
      endTime,
      location,
      price,
      discount,
      maxParticipants,
      isPrivate,
      status,
    } = req.body;
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    const userId = new Types.ObjectId(user._id.toString());
    if (
      event.creator.toString() !== userId.toString() &&
      user.role !== 'Admin'
    ) {
      return res
        .status(403)
        .json({ message: 'Нет прав для редактирования события' });
    }

    if (date) {
      const eventDate = new Date(date);
      if (isNaN(eventDate.getTime())) {
        return res.status(400).json({ message: 'Неверный формат даты' });
      }
      event.date = eventDate;
    }

    if (title) event.title = title;
    if (shortDescription) event.shortDescription = shortDescription;
    if (description) event.description = description;
    if (organizerInfo) event.organizerInfo = organizerInfo;
    if (imageUrl !== undefined) event.imageUrl = imageUrl;
    if (startTime) event.startTime = startTime;
    if (endTime) event.endTime = endTime;
    if (location) event.location = location;
    if (price !== undefined) event.price = price;
    if (discount !== undefined) event.discount = discount;
    if (maxParticipants) event.maxParticipants = maxParticipants;
    if (isPrivate !== undefined) event.isPrivate = isPrivate;
    if (user.role === 'Admin' && status) event.status = status;

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
    if (
      event.creator.toString() !== userId.toString() &&
      user.role !== 'Admin'
    ) {
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
      return res
        .status(403)
        .json({ message: 'Нет прав для приглашения участников' });
    }

    if (!event.isPrivate) {
      return res
        .status(400)
        .json({ message: 'Приглашения доступны только для закрытых событий' });
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
      return res
        .status(400)
        .json({ message: 'Вы не приглашены на это событие' });
    }

    if (event.participants.includes(userId)) {
      return res
        .status(400)
        .json({ message: 'Вы уже являетесь участником этого события' });
    }

    if (event.participants.length >= event.maxParticipants) {
      return res
        .status(400)
        .json({ message: 'Достигнуто максимальное количество участников' });
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
      return res
        .status(400)
        .json({ message: 'Вы не приглашены на это событие' });
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

export const getAllPublicEvents = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, dateFrom, dateTill } = req.query;
    const query: any = { isPrivate: false };

    if (dateFrom || dateTill) {
      query.date = {};
      if (dateFrom) {
        query.date.$gte = new Date(dateFrom as string);
      }
      if (dateTill) {
        query.date.$lte = new Date(dateTill as string);
      }
    }

    const events = await EventModel.find(query)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .populate('creator participants');

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении публичных событий' });
  }
};

export const applyForEvent = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const event = await EventModel.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    const userId = new Types.ObjectId(user._id.toString());

    // Проверяем, не является ли пользователь уже участником
    if (event.participants.some(p => p.equals(userId))) {
      return res.status(400).json({ message: 'Вы уже являетесь участником этого события' });
    }

    // Проверяем, не отправлял ли пользователь уже заявку
    if (event.invitations.some(i => i.equals(userId))) {
      return res.status(400).json({ message: 'Вы уже отправили заявку на участие' });
    }

    // Проверяем, не достигнуто ли максимальное количество участников
    if (event.participants.length >= event.maxParticipants) {
      return res.status(400).json({ message: 'Достигнуто максимальное количество участников' });
    }

    // Для публичных событий сразу добавляем в участники
    if (!event.isPrivate) {
      event.participants.push(userId);
      await event.save();
      return res.json({ message: 'Вы успешно присоединились к событию' });
    }

    // Для приватных событий добавляем в список заявок
    event.invitations.push(userId);
    await event.save();
    res.json({ message: 'Заявка на участие отправлена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при отправке заявки на участие' });
  }
};

// Получение списка заявок на событие
export const getEventApplications = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const event = await EventModel.findById(id)
      .populate('invitations', 'username email avatar rating')
      .populate('participants', 'username email avatar rating');

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    // Проверяем, является ли пользователь мастером события
    if (!event.master || event.master.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Нет прав для просмотра заявок' });
    }

    res.json({
      applications: event.invitations,
      participants: event.participants,
      maxParticipants: event.maxParticipants,
      isRegistrationClosed: event.status === 'closed'
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении заявок' });
  }
};

// Одобрение игрока
export const approvePlayer = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const event = await EventModel.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    // Проверяем, является ли пользователь мастером события
    if (!event.master || event.master.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Нет прав для одобрения игроков' });
    }

    const playerId = new Types.ObjectId(userId);

    // Проверяем, есть ли заявка от этого игрока
    if (!event.invitations.some(i => i.equals(playerId))) {
      return res.status(400).json({ message: 'Игрок не подавал заявку на участие' });
    }

    // Проверяем, не достигнуто ли максимальное количество участников
    if (event.participants.length >= event.maxParticipants) {
      return res.status(400).json({ message: 'Достигнуто максимальное количество участников' });
    }

    // Удаляем из заявок и добавляем в участники
    event.invitations = event.invitations.filter(i => !i.equals(playerId));
    event.participants.push(playerId);

    await event.save();
    res.json({ message: 'Игрок успешно одобрен' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при одобрении игрока' });
  }
};

// Отклонение игрока
export const rejectPlayer = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const event = await EventModel.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    // Проверяем, является ли пользователь мастером события
    if (!event.master || event.master.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Нет прав для отклонения игроков' });
    }

    const playerId = new Types.ObjectId(userId);

    // Проверяем, есть ли заявка от этого игрока
    if (!event.invitations.some(i => i.equals(playerId))) {
      return res.status(400).json({ message: 'Игрок не подавал заявку на участие' });
    }

    // Удаляем из заявок
    event.invitations = event.invitations.filter(i => !i.equals(playerId));

    await event.save();
    res.json({ message: 'Заявка игрока отклонена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при отклонении игрока' });
  }
};

// Закрытие записи
export const closeRegistration = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const event = await EventModel.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    // Проверяем, является ли пользователь мастером события
    if (!event.master || event.master.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Нет прав для закрытия записи' });
    }

    // Закрываем запись
    event.status = 'closed';

    await event.save();
    res.json({ message: 'Запись на событие закрыта' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при закрытии записи' });
  }
};

// Открытие записи
export const openRegistration = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const event = await EventModel.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' });
    }

    // Проверяем, является ли пользователь мастером события
    if (!event.master || event.master.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Нет прав для открытия записи' });
    }

    // Проверяем, что событие находится в статусе closed
    if (event.status !== 'closed') {
      return res.status(400).json({ message: 'Запись уже открыта' });
    }

    // Открываем запись (возвращаем в статус approved, если событие было одобрено администратором)
    event.status = 'approved';

    await event.save();
    res.json({ message: 'Запись на событие открыта' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при открытии записи' });
  }
};

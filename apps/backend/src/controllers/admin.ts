import { Response, NextFunction, Request } from 'express';
import { AuthRequest } from '../types/auth.ts';
import Event from '../models/event.ts';
import User from '../models/auth.ts';
import Filter from '../models/filters.ts';
import News from '../models/news.ts';
import AdminAction from '../models/admin.ts';
import { ApiError } from '../middlewares/errorHandler.ts';

export const approveEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) throw new ApiError(404, 'Событие не найдено');

    event.status = 'approved';
    await event.save();
    await AdminAction.create({
      adminId: req.user?._id,
      actionType: 'approve',
      targetId: id,
    });

    res.status(200).json({ message: 'Событие успешно утверждено' });
  } catch (error) {
    next(error);
  }
};

export const rejectEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const event = await Event.findById(id);
    if (!event) throw new ApiError(404, 'Событие не найдено');

    event.status = 'rejected';
    await event.save();
    await AdminAction.create({
      adminId: req.user?._id,
      actionType: 'reject',
      targetId: id,
      reason,
    });

    res.status(200).json({ message: 'Событие успешно отклонено' });
  } catch (error) {
    next(error);
  }
};

export const blockUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { reason, duration } = req.body;
    const user = await User.findById(id);
    if (!user) throw new ApiError(404, 'Пользователь не найден');

    user.isBlocked = true;
    user.blockUntil = duration ? new Date(Date.now() + duration * 1000) : null;
    await user.save();
    await AdminAction.create({
      adminId: req.user?._id,
      actionType: 'block',
      targetId: id,
      reason,
    });

    res.status(200).json({ message: 'Пользователь успешно заблокирован' });
  } catch (error) {
    next(error);
  }
};

export const unblockUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) throw new ApiError(404, 'Пользователь не найден');

    user.isBlocked = false;
    await user.save();
    await AdminAction.create({
      adminId: req.user?._id,
      actionType: 'unblock',
      targetId: id,
    });

    res.status(200).json({ message: 'Пользователь успешно разблокирован' });
  } catch (error) {
    next(error);
  }
};

export const addFilter = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, options } = req.body;
    if (!name || !options || !Array.isArray(options)) {
      throw new ApiError(400, 'Некорректные данные');
    }

    const filter = new Filter({ name, options });
    await filter.save();
    await AdminAction.create({
      adminId: req.user?._id,
      actionType: 'add_filter',
      targetId: filter._id,
    });

    res.status(201).json({ message: 'Фильтр успешно добавлен' });
  } catch (error) {
    next(error);
  }
};

export const createNews = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, content, publishDate } = req.body;
    if (!title || !content)
      throw new ApiError(400, 'Заголовок и текст новости обязательны');

    const news = new News({
      title,
      content,
      publishDate: publishDate || new Date(),
    });
    await news.save();

    res
      .status(201)
      .json({ message: 'Новость успешно создана', newsId: news._id });
  } catch (error) {
    next(error);
  }
};

export const updateNews = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, publishDate } = req.body;
    const news = await News.findById(id);
    if (!news) throw new ApiError(404, 'Новость не найдена');

    if (title) news.title = title;
    if (content) news.content = content;
    if (publishDate) news.publishDate = publishDate;
    await news.save();

    res.status(200).json({ message: 'Новость успешно обновлена' });
  } catch (error) {
    next(error);
  }
};

export const deleteNews = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const news = await News.findByIdAndDelete(id);
    if (!news) throw new ApiError(404, 'Новость не найдена');

    res.status(200).json({ message: 'Новость успешно удалена' });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({})
      .select('-password') // Исключаем пароль из результатов
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await User.countDocuments();

    res.json({
      users,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Ошибка при получении списка пользователей' });
  }
};

import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth';
import Event from '../models/event';
import User from '../models/auth';
import Filter from '../models/filters';
import News from '../models/news';
import AdminAction from '../models/admin';
import { ApiError } from '../middlewares/errorHandler';

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
      adminId: req.user?.userId,
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
      adminId: req.user?.userId,
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
      adminId: req.user?.userId,
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
      adminId: req.user?.userId,
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
      adminId: req.user?.userId,
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

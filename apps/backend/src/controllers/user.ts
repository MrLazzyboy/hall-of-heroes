import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth.ts';
import User from '../models/auth.ts';
import Notification from '../models/notification.ts';
import { ApiError } from '../middlewares/errorHandler.ts';
import path from 'path';
import fs from 'fs';

export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id).populate('events');
    if (!user) throw new ApiError(404, 'Пользователь не найден 1');

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, profile } = req.body;
    const user = await User.findById(req.user?._id);
    if (!user) throw new ApiError(404, 'Пользователь не найден 2');

    if (username) user.username = username;
    if (profile) user.profile = { ...user.profile, ...profile };

    await user.save();
    res.status(200).json({ message: 'Данные обновлены', user });
  } catch (error) {
    next(error);
  }
};

export const deleteCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.user?._id);
    if (!user) throw new ApiError(404, 'Пользователь не найден 3');

    res.status(200).json({ message: 'Пользователь удален' });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('events');
    if (!user) throw new ApiError(404, 'Пользователь не найден 4');

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserNotifications = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const notifications = await Notification.find({
      user: req.user?._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('avatar');
    const user = await User.findById(req.user?._id);
    if (!user) throw new ApiError(404, 'Пользователь не найден 5');

    if (!req.file) throw new ApiError(400, 'Файл не загружен');

    // Проверяем, существует ли директория для загрузки
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    user.profile.avatarUrl = `/uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({ message: 'Аватар обновлен', user });
  } catch (error) {
    next(error);
  }
};

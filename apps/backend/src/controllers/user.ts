import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth.ts';
import User from '../models/user.ts';
import Notification from '../models/notification.ts';
import { ApiError } from '../middlewares/errorHandler.ts';

export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user?.userId).populate('events');
    if (!user) throw new ApiError(404, 'Пользователь не найден');

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
    const user = await User.findById(req.user?.userId);
    if (!user) throw new ApiError(404, 'Пользователь не найден');

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
    const user = await User.findByIdAndDelete(req.user?.userId);
    if (!user) throw new ApiError(404, 'Пользователь не найден');

    res.status(200).json({ message: 'Аккаунт удален' });
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
    const user = await User.findById(id).select(
      'username profile.avatarUrl profile.bio'
    );
    if (!user) throw new ApiError(404, 'Пользователь не найден');

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
    const notifications = await Notification.find({ userId: req.user?.userId });
    res.status(200).json({ notifications });
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
    if (!req.file) throw new ApiError(400, 'Файл не загружен');

    const user = await User.findById(req.user?.userId);
    if (!user) throw new ApiError(404, 'Пользователь не найден');

    if (!user.profile) user.profile = {};
    user.profile.avatarUrl = `/uploads/${req.file.filename}`;
    await user.save();

    res
      .status(200)
      .json({ message: 'Аватар загружен', avatarUrl: user.profile.avatarUrl });
  } catch (error) {
    next(error);
  }
};

import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth.ts';
import User from '../models/auth.ts';
import { ApiError } from './errorHandler.ts';

export const isAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?._id) {
      throw new ApiError(401, 'Пользователь не аутентифицирован');
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ApiError(404, 'Пользователь не найден при проверке ролей');
    }
    if (user.role !== 'Admin' && !user.roles.includes('Admin')) {
      throw new ApiError(403, 'Доступ запрещен');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const isMaster = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?._id) {
      throw new ApiError(401, 'Пользователь не аутентифицирован');
    }
    const user = await User.findById(req.user._id);
    if (!user || !user.roles.includes('Master')) {
      throw new ApiError(403, 'Доступ запрещен');
    }
    next();
  } catch (error) {
    next(error);
  }
};

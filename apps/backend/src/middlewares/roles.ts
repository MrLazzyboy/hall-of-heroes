import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth';
import User from '../models/auth';
import { ApiError } from './errorHandler';

export const isAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user?.userId);
    if (!user) {
      throw new ApiError(404, 'Пользователь не найден');
    }
    if (user.role !== 'Admin') {
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
    const user = await User.findById(req.user?.userId);
    if (!user || !user.roles.includes('Master')) {
      throw new ApiError(403, 'Доступ запрещен');
    }
    next();
  } catch (error) {
    next(error);
  }
};

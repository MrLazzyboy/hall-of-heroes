import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth';
import User from '../models/auth';

export const isAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.user?.userId);
  if (!user || user.role !== 'Admin') {
    return res.status(403).json({ error: 'Доступ запрещен' });
  }
  next();
};

export const isMaster = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.user?.userId);
  if (!user || !user.roles.includes('Master')) {
    return res.status(403).json({ error: 'Доступ запрещен' });
  }
  next();
};

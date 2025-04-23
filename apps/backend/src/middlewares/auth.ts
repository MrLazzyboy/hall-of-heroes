import { Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/auth.ts';
import { ApiError } from './errorHandler.ts';
import User from '../models/auth.ts';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET не установлен в .env');
}
const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Некорректный формат токена');
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'Токен отсутствует');
    }
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };
      
      const user = await User.findById(decoded._id);
      
      if (!user) {
        throw new ApiError(401, 'Пользователь не найден authMiddleware');
      }

      // Преобразуем _id в строку для совместимости
      const userObject = user.toObject();
      req.user = {
        ...userObject,
        _id: (userObject._id as mongoose.Types.ObjectId).toString()
      } as any;
      
      // Проверяем наличие req.user после присвоения
      if (req.user) {
        console.log('Auth successful, user set in request:', {
          _id: req.user._id,
          username: req.user.username,
          role: req.user.role,
          roles: req.user.roles
        });
      }

      next();
    } catch (jwtError) {
      throw new ApiError(401, 'Недействительный токен');
    }
  } catch (error) {
    next(error);
  }
};

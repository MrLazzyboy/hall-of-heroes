import { Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/auth';
import { ApiError } from './errorHandler';

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

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.user = { userId: new mongoose.Types.ObjectId(decoded.userId) };

    next(); // Пропускаем к следующему middleware
  } catch (error) {
    next(error); // Передаем ошибку обработчику ошибок
  }
};

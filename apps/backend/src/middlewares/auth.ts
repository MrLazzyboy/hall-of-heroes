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
    console.log('=== Auth Middleware Start ===');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    
    const authHeader = req.headers.authorization;
    console.log('Authorization header:', authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Error: Invalid token format');
      throw new ApiError(401, 'Некорректный формат токена');
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('Error: Token is missing');
      throw new ApiError(401, 'Токен отсутствует');
    }

    console.log('JWT Token:', token);
    console.log('JWT_SECRET length:', JWT_SECRET.length);
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };
      console.log('Decoded JWT:', decoded);
      
      const user = await User.findById(decoded._id);
      console.log('Database query for user ID:', decoded._id);
      console.log('Found user:', user ? {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        roles: user.roles
      } : null);
      
      if (!user) {
        console.log('Error: User not found in database');
        throw new ApiError(401, 'Пользователь не найден');
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
      console.log('=== Auth Middleware End ===');
      
      next();
    } catch (jwtError) {
      console.log('JWT verification error:', jwtError);
      throw new ApiError(401, 'Недействительный токен');
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    next(error);
  }
};

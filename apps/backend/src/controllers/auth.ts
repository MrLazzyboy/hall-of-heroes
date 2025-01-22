import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/auth';
import { ApiError } from '../middlewares/errorHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const register = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new ApiError(400, 'Все поля обязательны');
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, 'Email уже зарегистрирован');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'Player',
      roles: [],
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: 'Пользователь зарегистрирован', userId: newUser._id });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, 'Email и пароль обязательны');
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError(401, 'Неверные учетные данные');
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(200).json({ message: 'Успешная авторизация', token });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ message: 'Логаут выполнен' });
  } catch (error) {
    next(error);
  }
};

export const session = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'Токен отсутствует');
    }
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    res
      .status(200)
      .json({ message: 'Сессия действительна', userId: decoded.userId });
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, role } = req.body;
    if (!userId || !['Player', 'Master'].includes(role)) {
      throw new ApiError(400, 'Некорректные данные');
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'Пользователь не найден');
    }
    if (role === 'Master') {
      if (!user.roles.includes('Master')) {
        user.roles.push('Master');
      }
    } else {
      user.roles = user.roles.filter((r) => r !== 'Master');
    }
    await user.save();
    res
      .status(200)
      .json({ message: `Роль пользователя обновлена`, roles: user.roles });
  } catch (error) {
    next(error);
  }
};

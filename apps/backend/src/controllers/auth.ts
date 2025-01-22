/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';
import { AuthRequest } from '../types/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email уже зарегистрирован' });
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
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(200).json({ message: 'Успешная авторизация', token });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  res.status(200).json({ message: 'Логаут выполнен' });
};

export const session = async (req: AuthRequest, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Токен отсутствует' });
    }
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    res
      .status(200)
      .json({ message: 'Сессия действительна', userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ error: 'Сессия недействительна' });
  }
};

export const updateRole = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, role } = req.body;
    if (!userId || !['Player', 'Master'].includes(role)) {
      return res.status(400).json({ error: 'Некорректные данные' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    // Обновляем доп. роль Master
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
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import hpp from 'hpp';
import authRoutes from './routes/auth';
import {
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
  refreshLimiter,
} from './middlewares/rateLimiters';
import { errorHandler } from './middlewares/errorHandler';
import commonRoutes from './routes/common';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(helmet());
app.use(hpp());
app.use(
  cors({
    origin: '*', // Разрешить запросы со всех доменов
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Разрешенные методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешенные заголовки
  })
);

app.use(morgan('dev')); // Логирует все запросы в консоли
app.use(express.json({ limit: '10kb' })); // Ограничение 10KB

// Запросы с ограничением
app.use(
  '/auth',
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
  refreshLimiter,
  authRoutes
);

// Публичные
app.use('/common', commonRoutes);

// Обработчик ошибок
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/myapp')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error('MongoDB connection error:', error));

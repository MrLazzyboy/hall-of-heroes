import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import hpp from 'hpp';
import authRoutes from './routes/auth';
import { errorHandler } from './middlewares/errorHandler';
import commonRoutes from './routes/common';
import userRoutes from './routes/user';
import eventsRoutes from './routes/events';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(hpp());
app.use(
  cors({
    origin: '*', // Разрешить запросы со всех доменов
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Разрешенные методы
    allowedHeaders: '*', // Разрешенные заголовки
  })
);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '10kb' })); // Ограничение 10KB

// Запросы с ограничением
app.use('/auth', authRoutes);

// Публичные
app.use('/common', commonRoutes);

// Пользовательские
app.use('/users', userRoutes);

// Админские апи
app.use('/admin', adminRoutes);

// События
app.use('/events', eventsRoutes);

// Обработчик ошибок
app.use(errorHandler);

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI не установлен в .env');
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Завершаем процесс с кодом ошибки
  });

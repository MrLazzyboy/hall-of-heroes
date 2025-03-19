import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import hpp from 'hpp';
import authRoutes from './routes/auth.ts';
import { errorHandler } from './middlewares/errorHandler.ts';
import commonRoutes from './routes/common.ts';
import userRoutes from './routes/user.ts';
import eventsRoutes from './routes/events.ts';
import adminRoutes from './routes/admin.ts';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(helmet());
app.use(hpp());

// todo поправить если будут проблемы с корсами
// const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['*'];
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

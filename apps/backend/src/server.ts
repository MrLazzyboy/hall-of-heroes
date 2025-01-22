import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import {
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
  refreshLimiter,
} from './middlewares/rateLimiters';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Подключение маршрутов с лимитами
app.use('/auth/login', loginLimiter, authRoutes);
app.use('/auth/register', registerLimiter, authRoutes);
app.use('/auth/forgot-password', forgotPasswordLimiter, authRoutes);
app.use('/auth/refresh', refreshLimiter, authRoutes);

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/myapp')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error('MongoDB connection error:', error));

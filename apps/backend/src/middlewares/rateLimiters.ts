import rateLimit from 'express-rate-limit';

// todo: сделать нормальные лимиты когда будем готовы к продакшену
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  limit: 50, // Макс. 5 попыток
  message: { error: 'Слишком много попыток. Попробуйте позже.' },
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час
  limit: 100, // Не больше 10 регистраций в час с одного IP
  message: { error: 'Слишком много регистраций. Попробуйте позже.' },
});

export const forgotPasswordLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 минут
  limit: 5, // Макс. 5 попыток сброса пароля
  message: {
    error: 'Слишком много попыток восстановления пароля. Попробуйте позже.',
  },
});

export const refreshLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 минут
  limit: 20, // Не больше 20 обновлений токена за 10 минут
  message: { error: 'Слишком много обновлений токена. Подождите немного.' },
});

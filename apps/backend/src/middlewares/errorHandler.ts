import { Request, Response, NextFunction } from 'express';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }
  res.status(err.status || 500).json({
    error: err.message || 'Внутренняя ошибка сервера',
  });
};

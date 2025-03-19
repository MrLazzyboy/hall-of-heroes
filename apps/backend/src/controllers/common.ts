import { Request, Response, NextFunction } from 'express';
import News from '../models/news.ts';
import Filter from '../models/filters.ts';
import { ApiError } from '../middlewares/errorHandler.ts';

export const getNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = req.query.sort === 'asc' ? 1 : -1;

    if (page < 1 || limit < 1) {
      throw new ApiError(400, 'Некорректные параметры пагинации');
    }

    const total = await News.countDocuments();
    const news = await News.find()
      .sort({ publishDate: sort })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      news,
      pagination: { page, limit, total },
    });
  } catch (error) {
    next(error);
  }
};

export const getFilters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = await Filter.find();
    if (filters.length === 0) {
      res
        .status(200)
        .json({ message: 'Нет доступных фильтров', filters: [] });
      return;
    }
    res.status(200).json(filters);
  } catch (error) {
    next(error);
  }
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import News from '../models/news';
import Filter from '../models/filters';

export const getNews = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = req.query.sort === 'asc' ? 1 : -1;

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
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const getFilters = async (req: Request, res: Response) => {
  try {
    const filters = await Filter.find();
    res.status(200).json(filters);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

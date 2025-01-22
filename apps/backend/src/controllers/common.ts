import express, { Request, Response } from 'express';
import { NewsModel, FilterModel } from '../models/common';
import { FilterQuery } from 'mongoose';

const router = express.Router();

// GET /news - Retrieve news list with pagination and sorting
router.get('/news', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = req.query.sort === 'asc' ? 1 : -1;

    const filter: FilterQuery<typeof NewsModel> = {};

    const news = await NewsModel.find(filter)
      .sort({ publishDate: sort })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await NewsModel.countDocuments(filter);

    res.status(200).json({
      news,
      pagination: {
        page,
        limit,
        total,
      },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /filters - Retrieve list of event filters
router.get('/filters', async (req: Request, res: Response) => {
  try {
    const filters = await FilterModel.find();

    res.status(200).json(filters);
  } catch (error) {
    console.error('Error fetching filters:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

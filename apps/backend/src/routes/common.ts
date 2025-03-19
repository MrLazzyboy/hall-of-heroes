import { Router } from 'express';
import { getNews, getFilters } from '../controllers/common.ts';

const router = Router();

router.get('/news', getNews);
router.get('/filters', getFilters);

export default router;

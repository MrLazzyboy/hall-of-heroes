import { Request } from 'express';
import mongoose from 'mongoose';

export interface AuthRequest extends Request {
  user?: { userId: mongoose.Types.ObjectId };
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}

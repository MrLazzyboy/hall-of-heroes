import { Request } from 'express';
import mongoose from 'mongoose';
import { User } from '../models/auth';

export interface AuthRequest extends Request {
  user?: User;
  file?: Express.Multer.File;
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}

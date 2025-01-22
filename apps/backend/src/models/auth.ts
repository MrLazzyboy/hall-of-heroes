import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: 'Player' | 'Admin'; // Основная роль
  roles: string[]; // Дополнительные роли (например, Master)
  createdAt: Date;
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Player', 'Admin'], default: 'Player' },
  roles: { type: [String], default: [] }, // Для дополнительных ролей
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<User>('User', UserSchema);

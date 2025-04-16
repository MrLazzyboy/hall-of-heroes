import mongoose, { Document, Schema } from 'mongoose';
import { IEvent } from './event';

export interface User extends Document {
  username: string;
  email: string;
  phone: string;
  password: string;
  role: 'Player' | 'Admin'; // Основная роль
  roles: string[]; // Дополнительные роли (например, Master)
  createdAt: Date;
  isBlocked: boolean;
  blockUntil: Date | null;
  events: mongoose.Types.ObjectId[]; // Добавляем поле events
  profile: {
    avatarUrl?: string;
    bio?: string;
  };
  // Виртуальные поля
  createdEvents: IEvent[];
  participatingEvents: IEvent[];
  invitedEvents: IEvent[];
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Player', 'Admin'], default: 'Player' },
  roles: { type: [String], default: [] }, // Для дополнительных ролей
  createdAt: { type: Date, default: Date.now },
  isBlocked: { type: Boolean, default: false },
  blockUntil: { type: Date, default: null },
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }], // Добавляем поле events
  profile: {
    avatarUrl: { type: String },
    bio: { type: String },
  },
});

// Добавляем виртуальные поля для событий
UserSchema.virtual('createdEvents', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'creator',
});

UserSchema.virtual('participatingEvents', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'participants',
});

UserSchema.virtual('invitedEvents', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'invitations',
});

// Включаем виртуальные поля при преобразовании в JSON
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

export default mongoose.model<User>('User', UserSchema);

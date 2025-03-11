import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    bio?: string;
  };
  notifications: mongoose.Types.ObjectId[];
  events: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    bio: { type: String, default: '' },
  },
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

export default mongoose.model<IUser>('User', UserSchema);

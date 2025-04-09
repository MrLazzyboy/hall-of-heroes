import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  shortDescription: string;
  description: string;
  organizerInfo: string;
  imageUrl?: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  price: number;
  discount: number;
  maxParticipants: number;
  isPrivate: boolean;
  status: 'approved' | 'archived' | 'pending' | 'rejected';
  creator: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  invitations: mongoose.Types.ObjectId[];
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  organizerInfo: { type: String, required: true },
  imageUrl: { type: String },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, required: true, min: 0, max: 100, default: 0 },
  maxParticipants: { type: Number, required: true, min: 1 },
  isPrivate: { type: Boolean, required: true, default: false },
  status: {
    type: String,
    enum: ['approved', 'archived', 'rejected', 'pending'],
    default: 'pending',
  },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  invitations: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IEvent>('Event', EventSchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  status: 'approved' | 'archived' | 'pending' | 'rejected';
  creator: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  invitations: mongoose.Types.ObjectId[];
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
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

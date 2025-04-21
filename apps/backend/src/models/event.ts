import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  shortDescription: string;
  description: string;
  organizerInfo: string;
  format: string;
  system: string;
  setting: string;
  duration: string;
  playerExperience: string;
  genre: string;
  characterLevel: string;
  imageUrl?: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  price: number;
  discount: number;
  maxParticipants: number;
  isPrivate: boolean;
  status: 'approved' | 'archived' | 'pending' | 'rejected' | 'closed';
  creator: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  invitations: mongoose.Types.ObjectId[];
  master: mongoose.Types.ObjectId;
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  organizerInfo: { type: String },
  format: { 
    type: String, 
    required: true,
    enum: ['Игровая сессия', 'Мероприятие']
  },
  master: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: function() { return this.format === 'Игровая сессия'; }
  },
  system: { 
    type: String,
    required: function() { return this.format === 'Игровая сессия'; }
  },
  setting: { 
    type: String,
    required: function() { return this.format === 'Игровая сессия'; }
  },
  duration: { 
    type: String,
    required: function() { return this.format === 'Игровая сессия'; }
  },
  playerExperience: { 
    type: String,
    required: function() { return this.format === 'Игровая сессия'; }
  },
  genre: { 
    type: String,
    required: function() { return this.format === 'Игровая сессия'; }
  },
  characterLevel: { 
    type: String,
    required: function() { return this.format === 'Игровая сессия'; }
  },
  imageUrl: { type: String },
  date: { type: Date, required: true },
  startTime: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v: string) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      },
      message: 'Неверный формат времени (HH:mm)'
    }
  },
  endTime: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v: string) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      },
      message: 'Неверный формат времени (HH:mm)'
    }
  },
  location: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, required: true, min: 0, max: 100, default: 0 },
  maxParticipants: { type: Number, required: true, min: 1 },
  isPrivate: { type: Boolean, required: true, default: false },
  status: {
    type: String,
    enum: ['approved', 'archived', 'pending', 'rejected', 'closed'],
    default: 'pending',
  },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  invitations: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IEvent>('Event', EventSchema);

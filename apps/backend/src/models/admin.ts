import mongoose, { Document, Schema } from 'mongoose';

export interface IAdminAction extends Document {
  adminId: string;
  actionType: string;
  targetId: string;
  reason?: string;
  timestamp: Date;
}

const AdminActionSchema = new Schema<IAdminAction>({
  adminId: { type: String, required: true },
  actionType: {
    type: String,
    required: true,
    enum: [
      'approve',
      'reject',
      'block',
      'unblock',
      'add_filter',
      'edit_news',
      'delete_news',
    ],
  },
  targetId: { type: String, required: true },
  reason: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IAdminAction>('AdminAction', AdminActionSchema);

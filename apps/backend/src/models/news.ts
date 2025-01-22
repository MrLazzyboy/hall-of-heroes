import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
  title: string;
  content: string;
  publishDate: Date;
}

const NewsSchema = new Schema<INews>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
});

export default mongoose.model<INews>('News', NewsSchema);

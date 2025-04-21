import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
  title: string;
  shortDescription: string;
  content: string;
  imageUrl: string;
  publishDate: Date;
}

const NewsSchema = new Schema<INews>({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  publishDate: { type: Date, default: Date.now },
});

export default mongoose.model<INews>('News', NewsSchema);

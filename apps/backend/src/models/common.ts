import mongoose, { Schema, Document } from 'mongoose';

// Define the schema for a news item
interface INews extends Document {
  title: string;
  content: string;
  publishDate: Date;
}

interface IFilter extends Document {
  name: string;
  options: string[];
}

const NewsSchema = new Schema<INews>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  publishDate: { type: Date, required: true },
});

const NewsModel = mongoose.model<INews>('News', NewsSchema);

const FilterSchema = new Schema<IFilter>({
  name: { type: String, required: true },
  options: { type: [String], required: true },
});

const FilterModel = mongoose.model<IFilter>('Filter', FilterSchema);

export { NewsModel, FilterModel };

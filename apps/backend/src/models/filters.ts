import mongoose, { Document, Schema } from 'mongoose';

export interface IFilter extends Document {
  name: string;
  options: string[];
}

const FilterSchema = new Schema<IFilter>({
  name: { type: String, required: true },
  options: { type: [String], required: true },
});

export default mongoose.model<IFilter>('Filter', FilterSchema);

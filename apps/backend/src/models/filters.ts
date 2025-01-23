import mongoose, { Document, Schema } from 'mongoose';

export interface IFilterOption {
  fullName: string;
  tagName?: string;
}

export interface IFilter extends Document {
  name: string;
  options: IFilterOption[];
}

const FilterSchema = new Schema<IFilter>({
  name: { type: String, required: true },
  options: [
    {
      fullName: { type: String, required: true },
      tagName: { type: String, required: false },
    },
  ],
});

export default mongoose.model<IFilter>('Filter', FilterSchema);

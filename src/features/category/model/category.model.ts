// /features/category/model/category.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface CategoryDocument extends Document {
  userId: string;
  name: string;
  current_balance: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<CategoryDocument>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    current_balance: { type: Number, default: 0 },
  },
  { timestamps: true } // Automatically adds and updates createdAt and updatedAt
);

export default mongoose.models.Category || mongoose.model<CategoryDocument>("Category", CategorySchema);

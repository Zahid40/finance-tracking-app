// /features/category/model/category.model.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface CategoryDocument extends Document {
  _id: Types.ObjectId; 
  userId: Types.ObjectId; 
  name: string;
  current_balance: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<CategoryDocument>(
  {
    _id: { type: Schema.Types.ObjectId , auto : true }, // Reference the User model
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference the User model
    name: { type: String, required: true },
    current_balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model<CategoryDocument>("Category", CategorySchema);

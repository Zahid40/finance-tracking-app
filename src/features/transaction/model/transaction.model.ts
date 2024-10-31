// /features/transaction/model/transaction.model.ts

import mongoose, { Schema, Document, Types } from "mongoose";

export interface TransactionDocument extends Document {
  _id: Types.ObjectId;
  categoryId: Types.ObjectId;
  userId: Types.ObjectId;
  transactionAmount: number; // rs . 560
  transactionType: boolean; // Credit = true , Debit  = false
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

 const TransactionSchema = new Schema<TransactionDocument>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    transactionAmount: { type: Number, required: true },
    transactionType: { type: Boolean, required: true },
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true } // Auto-create createdAt and updatedAt fields
);

export default mongoose.models.Transaction ||
  mongoose.model<TransactionDocument>("Transaction", TransactionSchema);

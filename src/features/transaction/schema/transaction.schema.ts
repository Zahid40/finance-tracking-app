// /features/transaction/schema/transaction.schema.ts

import { z } from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;

export const TransactionSchema = z.object({
  _id: z.string().regex(objectIdRegex, "Invalid ID format").optional(),
  categoryId: z
    .string()
    .min(1, "Category ID is required")
    .regex(objectIdRegex, "Invalid Category ID format"),
  userId: z.string().regex(objectIdRegex)
    .min(1,"At least one category ID is required"),
  transactionAmount: z.number().nonnegative("Amount must be positive"),
  transactionType: z.enum(["Credit", "Debit"], {
    required_error: "Transaction type is required",
  }),
  name: z
    .string()
    .min(3, "Transaction name must contain at least 3 characters")
    .max(40, "Transaction name must be 40 characters or less"),
  description: z.string().max(20, "Maximum 20 Characters Allowed").optional(),
  createdAt: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      "Invalid date format for createdAt"
    ),

  updatedAt: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      "Invalid date format for createdAt"
    ),
});

export const TransactionFormSchema = TransactionSchema.pick({
  name: true,
  description: true,
  transactionAmount: true,
  transactionType: true,
});

export const TransactionUpdateSchema = TransactionSchema.partial();

//Transaction ChartDate
export const TransactionsChartDataSchema = z.object({
  date: TransactionSchema.shape.createdAt, 
  amount: TransactionSchema.shape.transactionAmount, 
  transactionAmount: TransactionSchema.shape.transactionAmount, 
  transactionType: TransactionSchema.shape.transactionType, 
});
// /features/transaction/schema/transaction.schema.ts

import { z } from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;

export const TransactionSchema = z.object({
  _id: z.string().optional(),
  categoryId: z
    .string()
    .min(1, "Category ID is required")
    .regex(objectIdRegex, "Invalid Category ID format"),
  userId: z
    .string()
    .min(1, "User ID is required")
    .regex(objectIdRegex, "Invalid User ID format"),
  transactionAmount: z.number().nonnegative("Amount must be positive"),
  transactionType : z.boolean({
    required_error: "Transaction type is required",
    invalid_type_error: "Transaction type must be a Credit or Debit",
  }) ,
  name: z
    .string()
    .min(3, "Transaction name must contain at least 3 characters")
    .max(40, "Transaction name must be 40 characters or less"),
  description: z.string().optional(),
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
      "Invalid date format for updatedAt"
    ),
});

export const TransactionFormSchema = TransactionSchema.pick({
  name: true,
  description: true,
  transactionAmount : true , 
  transactionType : true
});

export const TransactionUpdateSchema = TransactionSchema.partial();

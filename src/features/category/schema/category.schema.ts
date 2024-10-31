// /features/category/schema/category.schema.ts
import { z } from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;

export const CategorySchema = z.object({
  _id: z
    .string()
    .optional(),
  
  userId: z
    .string()
    .min(1, "User ID is required")
    .regex(objectIdRegex, "Invalid User ID format"),
  
  name: z
    .string()
    .min(3, "Category name must contain at least 3 characters")
    .max(40, "Category name must be 40 characters or less"),
  
    initial_balance: z
    .number()
    .min(0, "Initial Balance must be at least 0")
    .default(0),
  current_balance: z
    .number()
    .min(0, "Current Balance must be at least 0")
    .default(0),
  
  createdAt: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format for createdAt"),
  
  updatedAt: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format for updatedAt"),
});

// Create a new schema with only name and current_balance fields
export const CategoryFormSchema = CategorySchema.pick({
  name: true,
  current_balance: true,
});

export const CategoryUpdateSchema = CategorySchema.partial();

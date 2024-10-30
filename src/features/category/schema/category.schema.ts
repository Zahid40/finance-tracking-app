// /features/category/schema/category.schema.ts
import { z } from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;

export const CategorySchema = z.object({
  userId: z
    .string()
    .min(1, "User ID is required")
    .regex(objectIdRegex, "Invalid User ID format"),
  name: z
    .string()
    .min(3, "Category name must contain at least 3 characters")
    .max(40, "Category name must be 40 characters or less"),
  current_balance: z.number().min(0, "Balance must be at least 0").default(0),
});

export const CategoryFormSchema = z.object({
  name: z
    .string()
    .min(3, "Category name must contain at least 3 characters")
    .max(40, "Category name must be 40 characters or less"),
  current_balance: z.number().min(0, "Balance must be at least 0").default(0),
});

export const CategoryUpdateSchema = CategorySchema.partial();

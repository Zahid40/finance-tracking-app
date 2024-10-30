// /features/category/schema/category.schema.ts
import { z } from "zod";

export const CategorySchema = z.object({
  userId: z.string().min(1 , "User ID is required"),
  name: z.string().min( 3 , "Category name is required and Must contain at Least 3 characters").max(40 , "Maximum length is 40 characters"),
  current_balance: z.number().min(0).default(0),
});


export const CategoryFormSchema = z.object({
  name: z.string().min( 3 , "Category name is required and Must contain at Least 3 characters").max(40 , "Maximum length is 40 characters"),
  current_balance: z.number().min(0).default(0),
});

export const CategoryUpdateSchema = CategorySchema.partial();

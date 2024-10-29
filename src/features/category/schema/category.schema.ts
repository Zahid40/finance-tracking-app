import { z } from 'zod';

export const CategorySchema = z.object({
  userId: z.string(),
  name: z.string(),
  current_balance: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const CategoryFormSchema = z.object({
  name: z.string().min(3).max(40),
  current_balance: z.number().min(0),
});

export const CategoryUpdateSchema = CategorySchema.partial();

import { z } from "zod";
import { CategoryFormSchema, CategorySchema } from "../schema/category.schema";

export type CategoryType = z.infer<typeof CategorySchema>;

export type CategoryFormType = z.infer<typeof CategoryFormSchema>;

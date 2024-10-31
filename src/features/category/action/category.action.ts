// /features/category/actions/category.action.ts
"use server";
import { cache } from "react";
import { connect } from "@/lib/db";
import Category from "@/features/category/model/category.model";
import { revalidateTag } from "next/cache";
import { CategorySchema } from "@/features/category/schema/category.schema";
import { z } from "zod";
import {
  CategoryFormType,
  CategoryType,
} from "@/features/category/types/category.type";


// Caching function to get categories, using Next.js cache settings
export const fetchCategories = cache(
  async (userId: string): Promise<CategoryType[]> => {
    // Connect to the database
    await connect();

    // Fetch categories by userId
    const categories = await Category.find({ userId }).lean();

    // Transform the result into the Category type, ensuring _id and userId are strings
    return categories.map((category) => ({
      _id: String(category._id),
      userId: String(category.userId),
      name: category.name,
      initial_balance: category.current_balance,
      current_balance: category.current_balance,
      createdAt: new Date(category.createdAt).toISOString(),
      updatedAt: new Date(category.updatedAt).toISOString(),
    })) as CategoryType[];
  }
);

// Revalidate categories on specific actions, like adding or updating categories
export const revalidateCategories = async () => {
  await revalidateTag("categories");
};

// Fetch a single category by ID and cache it
export const fetchCategoryById = cache(
  async (userId: string, categoryId: string): Promise<CategoryType | null> => {
    await connect();

    // Fetch the single category document based on the userId and categoryId
    const category = await Category.findOne({ _id: categoryId, userId });

    if (!category) return null;

    // Transform and return the category data to match the expected type
    return {
      _id: String(category._id),
      userId: String(category.userId),
      name: category.name,
      initial_balance: category.current_balance,
      current_balance: category.current_balance,
      createdAt: new Date(category.createdAt).toString(),
      updatedAt: new Date(category.updatedAt).toString(),
    };
  }
);

// Revalidate a single category, e.g., after update
export const revalidateCategory = async (categoryId: string) => {
  await revalidateTag(`category-${categoryId}`);
};

export const createCategory = async (
  data: CategoryFormType,
  userId: CategoryType["userId"]
) => {
  try {
    await connect();

    // Validate data with Zod using your defined schema
    const parsedData = CategorySchema.omit({
      _id: true,
      createdAt: true,
      updatedAt: true,
    }).parse({
        userId : userId ,
        initial_balance : data.current_balance,
      ...data,
    });

    // Create and save new category
    const newCategory = new Category(parsedData);
    await newCategory.save();

    // Manually construct a plain JavaScript object for safe serialization
    const categoryJson = {
      _id: newCategory._id.toString(),
      userId: newCategory.userId.toString(),
      name: newCategory.name,
      initial_balance: newCategory.current_balance,
      current_balance: newCategory.current_balance,
      createdAt: newCategory.createdAt.toISOString(),
      updatedAt: newCategory.updatedAt.toISOString(),
    };
    revalidateTag("categories")
  
      return { success: true, category: categoryJson };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      return { success: false, errors: errorMessages };
    }
    return { success: false, errors: ["Server error occurred."] };
  }
};

// POST a new category
import { connect } from "@/lib/db";
import Category from "../../../features/category/model/category.model";
import { CategorySchema } from "../../../features/category/schema/category.schema";
import { NextResponse } from "next/server";
import { z } from "zod";

// Fetch category by ID or all categories
export async function GET(request: Request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const category = await Category.findById(id);
      if (!category) {
        return NextResponse.json({ error: "Category not found" }, { status: 404 });
      }
      return NextResponse.json(category);
    }

    const categories = await Category.find({});
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connect();
    const data = await request.json();

    const parsedData = CategorySchema.parse(data); // Validate data

    // Create and save new category
    const newCategory = new Category(parsedData);
    await newCategory.save();

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    // Handle validation errors with Zod
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      return NextResponse.json(
        { error: formattedErrors.join(", ") },
        { status: 400 }
      );
    }

    // Server error handling
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

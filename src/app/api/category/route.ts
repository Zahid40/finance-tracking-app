// POST a new category
import { connect } from '@/lib/db'
import Category from '../../../features/category/model/category.model';
import { CategorySchema } from '../../../features/category/schema/category.schema';
import { NextResponse } from 'next/server';
import { z } from 'zod';

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
      const formattedErrors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      return NextResponse.json({ error: formattedErrors.join(', ') }, { status: 400 });
    }

    // Server error handling
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
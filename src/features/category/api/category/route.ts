// POST a new category
import { connect } from '@/lib/db'
import Category from '../../model/category.model';
import { CategorySchema } from '../../schema/category.schema';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: Request) {
    try {

        connect();
      const data = await request.json();
      const parsedData = CategorySchema.parse(data);
  
      const newCategory = new Category(parsedData);
      await newCategory.save();
      return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: error.errors }, { status: 400 });
      }
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }
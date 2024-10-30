"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { CategoryForm } from "@/features/category/components/CategoryForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { toUrlFriendlyFormatWithId } from "@/utils/url.utils";

interface Category {
  _id: string;
  userId: string;
  name: string;
  current_balance: number;
  createdAt: string;
  updatedAt: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
        toast.success("Categories loaded successfully!");
      } catch (error) {
        console.error("Error loading categories:", error);
        toast.error("Failed to load categories. Please try again.");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Category Page</h1>

      <div className="mb-8">
        <CategoryForm />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category._id} className="shadow-lg">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="text-xl">
                <Link href={`/category/${toUrlFriendlyFormatWithId( category.name , category._id )}`}>
                {category.name}
                </Link>
                </CardTitle>
              <CardDescription className="text-blue-100">
                Balance: ${category.current_balance.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(category.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(category.updatedAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

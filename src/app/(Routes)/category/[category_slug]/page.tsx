"use client";
import { fromUrlFriendlyFormatWithId } from "@/utils/url.utils";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Category {
  _id: string;
  userId: string;
  name: string;
  current_balance: number;
  createdAt: string;
  updatedAt: string;
}

export default function CategorySlugPage({ params }: { params: { category_slug: string } }) {
  const { category_slug } = params;
  const categoryFormatted = fromUrlFriendlyFormatWithId(category_slug);
  const categoryId = categoryFormatted.productId;

  const [category, setCategory] = useState<Category | null>(null); // Allow null for initial state

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/category?id=${categoryId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }

        const data = await response.json();
        setCategory(data);
        toast.success("Category loaded successfully!");
      } catch (error) {
        console.error("Error loading category:", error);
        toast.error("Failed to load category. Please try again.");
      }
    };

    fetchCategory();
  }, [categoryId]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Category Details</h1>
      {category ? (
        <div className=" shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold">{category.name}</h2>
          <p className="mt-2">
            <strong>Current Balance:</strong> ${category.current_balance.toFixed(2)}
          </p>
          <p className="mt-2">
            <strong>Created At:</strong> {new Date(category.createdAt).toLocaleDateString()}
          </p>
          <p className="mt-2">
            <strong>Updated At:</strong> {new Date(category.updatedAt).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Loading category details...</p>
      )}
    </div>
  );
}

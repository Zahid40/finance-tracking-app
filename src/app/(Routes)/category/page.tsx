"use client";

import { useState } from "react";
import { fetchCategories } from "@/actions/category.action";
import { useUser } from "@clerk/nextjs";
import CategoryCard from "@/features/category/components/CategoryCard";
import { CategoryType } from "@/features/category/types/category.type";
import CategoryButton from "@/features/category/components/CategoryButton";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import CategoryDrawer from "@/features/category/components/CategoryDrawer";

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  const { user } = useUser();

  const userId: CategoryType["_id"] = user?.publicMetadata.dbUserId as string;

  const {
    data: categories,
    isPending: categoriesLoading,
    refetch: reLoadCategory,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => fetchCategories(userId),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="p-4 space-y-2 h-full w-full">
      <div className="flex gap-2 items-center mb-8 justify-between">
        <h1 className="text-xl font-medium  text-nowrap">Category Page</h1>
        <CategoryButton />
      </div>

      {categoriesLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories?.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>
      )}

      {selectedCategory !== null && (
        <CategoryDrawer
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { fetchCategories } from "@/actions/category.action";
import { useUser } from "@clerk/nextjs";
import CategoryCard from "@/features/category/components/CategoryCard";
import { CategoryType } from "@/features/category/types/category.type";
import CategoryButton from "@/features/category/components/CategoryButton";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import { Link, useTransitionRouter } from "next-view-transitions";
import { formatDistance, formatRelative, subDays } from "date-fns";
import { currencyFormatter } from "@/utils/currencyFormatter.utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock2Icon } from "lucide-react";

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );
  const router = useTransitionRouter();

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
        <h1 className="text-xl font-medium  text-nowrap">All Categories</h1>
        <CategoryButton />
      </div>

      {categoriesLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories?.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category._id}`}
              className="cursor-pointer  px-6 py-8 rounded-3xl bg-secondary/20 border-2   transition-all duration-300 ease-in-out flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary-900 text-xl text-primary-100 font-medium">{category.name.slice(0,1)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">{category.name}</p>
                  <p className="text-[11px] flex gap-1 items-center leading-none">
                    {" "}
                    <Clock2Icon className="size-3" />
                    {formatDistance(
                      subDays(new Date(category.updatedAt), 0),
                      new Date(),
                      { addSuffix: true }
                    )}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xl">
                  {currencyFormatter(category.current_balance, 0)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

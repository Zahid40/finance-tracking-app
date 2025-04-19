import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currencyFormatter } from "@/utils/currencyFormatter.utils";
import React from "react";
import { formatDistanceToNow, formatRelative, subDays } from "date-fns";
import { toCapitalizeFirstLetter } from "@/utils/string.utils";
import { CategoryType } from "../types/category.type";

interface CategoryCardProps {
  category: CategoryType;
  onClick: (category: CategoryType) => void; // Define the type for the onClick function
}

export default function CategoryCard(props: CategoryCardProps) {
  const { category, onClick } = props;

  return (
    <div
      className="shadow-lg cursor-pointer  px-6 py-8 rounded-3xl bg-neutral-900/50 border-2   transition-all duration-300 ease-in-out flex justify-between items-center"
      onClick={() => onClick(category)} // Use the passed onClick prop
    >
      <div>
        <p className="text-lg font-semibold">{category.name}</p>
        <p className="text-xs capitalize">
          {formatRelative(subDays(new Date(category.updatedAt), 0), new Date())}
        </p>
      </div>
      <div>
        <p className="text-xl">
          {currencyFormatter(category.current_balance, 0)}
        </p>
      </div>
    </div>
  );
}

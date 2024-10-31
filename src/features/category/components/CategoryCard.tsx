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
      className="shadow-lg cursor-pointer light:bg-green-600 dark:bg-green-500 p-6 rounded-sm border-2 border-green-300"
      onClick={() => onClick(category)} // Use the passed onClick prop
    >
      <div>
        <p className="text-lg font-semibold">{category.name}</p>
      </div>
      <div>
        <p>{currencyFormatter(category.current_balance)}</p>
      </div>

      <p className="text-xs">
        {toCapitalizeFirstLetter(
          formatRelative(subDays(new Date(category.updatedAt), 0), new Date())
        )}
      </p>
    </div>
  );
}

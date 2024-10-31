"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

// Assume these components are defined elsewhere
import { CategoryForm } from "@/features/category/components/CategoryForm";
import { fetchCategories } from "@/features/category/action/category.action";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import CategoryCard from "@/features/category/components/CategoryCard";
import { TrackChart } from "@/features/category/components/TrackChart";
import { CategoryType } from "@/features/category/types/category.type";
import { Plus } from "lucide-react";

export default function Component() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  const { user } = useUser();
  const userId: CategoryType["_id"] = user?.publicMetadata.dbUserId as string;
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryData = await fetchCategories(userId);
        setCategories(categoryData);
        toast.success("Categories loaded successfully!");
      } catch (error) {
        console.error("Error loading categories:", error);
        toast.error("Failed to load categories. Please try again.");
      }
    };

    loadCategories();
  }, [userId]);

  const chartData = [
    { month: "January", desktop: 200 },
    { month: "February", desktop: 250 },
    { month: "March", desktop: 300 },
    { month: "April", desktop: 280 },
    { month: "May", desktop: 320 },
    { month: "June", desktop: 350 },
  ];

  const chartConfig = {
    desktop: {
      label: "Expenses",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Category Page</h1>

      <Button variant={'secondary'} className="mb-8 w-full" onClick={() => setIsCreateDrawerOpen(true)}>
       <Plus className="size-4" /> Create Category
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>

      <Drawer open={isCreateDrawerOpen} onOpenChange={setIsCreateDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Category</DrawerTitle>
            <DrawerDescription>
              Fill in the details to create a new category.
            </DrawerDescription>
          </DrawerHeader>
          <CategoryForm />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={!!selectedCategory}
        onOpenChange={() => setSelectedCategory(null)}
      >
        <DrawerContent className="h-[100dvh] ">
          <DrawerHeader>
            <DrawerTitle>{selectedCategory?.name}</DrawerTitle>
            <DrawerDescription>
              Category details and transactions
            </DrawerDescription>
            <DrawerClose asChild className="absolute right-4 top-4 ">
              <Button
                variant="outline"
                className="rounded-full size-8 border-2 border-primary p-0"
              >
                <Plus className="rotate-45 size-4" /> 
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <ScrollArea className="h-full">
            <div className="p-4 space-y-6">
              <TrackChart
                chartData={chartData}
                chartConfig={chartConfig}
                title={selectedCategory?.name as string}
                desc={selectedCategory?.name as string}
              />

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Transactions</h2>
                {/* Replace with actual transaction data */}
                kk
              </div>
            </div>
          </ScrollArea>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ScrollArea } from "@/components/ui/scroll-area";

import { fetchCategories } from "@/features/category/action/category.action";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import CategoryCard from "@/features/category/components/CategoryCard";
import { TrackChart } from "@/features/transaction/components/TransactionChart";
import { CategoryType } from "@/features/category/types/category.type";
import { Plus } from "lucide-react";
import TransactionButton from "@/features/transaction/components/TransactionButton";
import {
  TransactionType,
  TransactionsChartDataType,
} from "@/features/transaction/types/transaction.types";
import {
  fetchTransactionsByDateRange,
} from "@/features/transaction/action/transaction.action";
import TransactionCard from "@/features/transaction/components/TransactionCard";
import CategoryButton from "@/features/category/components/CategoryButton";
import CategoryMenuButton from "@/features/category/components/CategoryMenuButton";

export default function Component() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactionsChartData, setTransactionsChartData] = useState<
    TransactionsChartDataType[]
  >([]);

  const { user } = useUser();
  const userId: CategoryType["_id"] = user?.publicMetadata.dbUserId as string;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);
        const categoryData = await fetchCategories(userId);
        setCategories(categoryData);
        toast.success("Categories loaded successfully!");
      } catch (error) {
        console.error("Error loading categories:", error);
        toast.error("Failed to load categories. Please try again.");
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, [userId]);

  // Load transactions whenever a category is selected
  const loadTransactions = async () => {
    try {
      setTransactionsLoading(true);
      // Define endDate as today and startDate as one week ago
      const endDate = new Date().toISOString();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      // Convert startDate to ISO string
      const startDateISO = startDate.toISOString();

      // Fetch transactions within the date range
      const transactionData = await fetchTransactionsByDateRange(
        userId,
        selectedCategory?._id!,
        startDateISO,
        endDate
      );

      setTransactions(transactionData.transactions);
      console.log(transactionData.chartData);
      setTransactionsChartData(transactionData.chartData);

      toast.success("Transactions loaded successfully!");
    } catch (error) {
      console.error("Error loading transactions:", error);
      toast.error("Failed to load transactions. Please try again.");
    } finally {
      setTransactionsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      loadTransactions();
    }
  }, [selectedCategory]);

  const chartConfig = {
    amount: {
      label: "Balance",
      color: "hsl(var(--chart-5))",
    },
    transactionAmount: {
      label: "Last transaction",
      color: "hsl(var(--chart-5))",
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">Category Page</h1>

      <CategoryButton />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>

      <Drawer
        open={!!selectedCategory}
        onOpenChange={() => setSelectedCategory(null)}
      >
        <DrawerContent className="h-[100dvh] max-w-3xl m-auto">
          <DrawerHeader>
          <CategoryMenuButton categoryId={selectedCategory?._id!} />
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

          <TrackChart
            chartData={transactionsChartData}
            chartConfig={chartConfig}
          />
          <TransactionButton categoryId={selectedCategory?._id!} />

          <h2 className="text-lg font-semibold px-4 py-0">Transactions</h2>
          <ScrollArea className="h-full">
            <div className="p-4 space-y-1">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TransactionCard
                    transaction={transaction}
                    key={transaction._id}
                  />
                ))
              ) : (
                <p>No transactions available for this category.</p>
              )}
            </div>
          </ScrollArea>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

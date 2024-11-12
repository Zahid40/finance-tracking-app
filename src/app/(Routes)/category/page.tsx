"use client";

import { useCallback, useEffect, useState } from "react";
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

import { fetchCategories } from "@/features/category/action/category.action";
import { useSession, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import CategoryCard from "@/features/category/components/CategoryCard";
import { TrackChart } from "@/features/transaction/components/TransactionChart";
import { CategoryType } from "@/features/category/types/category.type";
import { Loader2, Plus, RefreshCcw } from "lucide-react";
import TransactionButton from "@/features/transaction/components/TransactionButton";
import {
  TransactionType,
  TransactionsChartDataType,
} from "@/features/transaction/types/transaction.types";
import { fetchTransactionsByDateRange } from "@/features/transaction/action/transaction.action";
import TransactionCard from "@/features/transaction/components/TransactionCard";
import CategoryButton from "@/features/category/components/CategoryButton";
import CategoryMenuButton from "@/features/category/components/CategoryMenuButton";
import { AppLogo } from "../../../../const";
import Loader from "@/components/Loader";

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

  const loadCategories = useCallback(
    async (refresh: boolean = false) => {
      try {
        setCategoriesLoading(true);
        const categoryData = await fetchCategories(userId);
        setCategories(categoryData);
        refresh
          ? toast.success("Showing Latest Categories")
          : toast.success("Categories loaded successfully!");
      } catch (error) {
        console.error("Error loading categories:", error);
        toast.error("Failed to load categories. Please try again.");
      } finally {
        setCategoriesLoading(false);
      }
    },
    [userId]
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const loadTransactions = useCallback(
    async (refresh: boolean = false) => {
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
        setTransactionsChartData(transactionData.chartData);

        refresh
          ? toast.success("Showing Latest Transactions")
          : toast.success("Transactions loaded successfully!");
      } catch (error) {
        console.error("Error loading transactions:", error);
        toast.error("Failed to load transactions. Please try again.");
      } finally {
        setTransactionsLoading(false);
      }
    },
    [userId, selectedCategory]
  );

  useEffect(() => {
    if (selectedCategory) {
      loadTransactions();
    }
  }, [loadTransactions]);

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
    <div className="p-4 space-y-2 h-full w-full">
      <h1 className="text-xl font-medium  ">Category Page</h1>
      <p className="mb-4">Create your custom categories </p>
      <div className="flex gap-2">
        <CategoryButton categoryRefresh={loadCategories} />
        <Button
          onClick={(e) => {
            e.preventDefault();
            loadCategories(true);
          }}
        >
          {categoriesLoading ? (
            <>
              Refreshing.... &nbsp;&nbsp;
              <Loader2 className="animate-spin" />
            </>
          ) : (
            <>
              Refresh &nbsp;&nbsp;
              <RefreshCcw />
            </>
          )}
        </Button>
      </div>

      {categoriesLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>
      )}

      <Drawer
        open={!!selectedCategory}
        onOpenChange={() => setSelectedCategory(null)}
      >
        <DrawerContent className="h-[100dvh] max-w-3xl m-auto">
          <DrawerHeader className="flex">
            <div>
            <CategoryMenuButton categoryId={selectedCategory?._id!} />
            <DrawerTitle>{selectedCategory?.name}</DrawerTitle>
            <DrawerDescription>
              Category details and transactions
            </DrawerDescription>
            </div>
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
            <TrackChart
              chartData={transactionsChartData}
              chartConfig={chartConfig}
            />
            <TransactionButton
              categoryId={selectedCategory?._id!}
              transactionRefresh={loadTransactions}
              categoryRefresh={loadCategories}
            />

            <div className="flex justify-center items-center">
              <h2 className="text-lg font-semibold px-4 py-0">Transactions</h2>
              <Button
                size={"sm"}
                onClick={(e) => {
                  e.preventDefault();
                  loadTransactions(true);
                }}
              >
                {transactionsLoading ? (
                  <>
                    Refreshing.... &nbsp;&nbsp;
                    <Loader2 className="animate-spin" />
                  </>
                ) : (
                  <>
                    Refresh &nbsp;&nbsp;
                    <RefreshCcw />
                  </>
                )}
              </Button>
            </div>

            {transactionsLoading ? (
              <Loader />
            ) : (
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
            )}
          </ScrollArea>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

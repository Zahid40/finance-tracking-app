"use client";
import { fetchTransactionsByDateRange } from "@/actions/transaction.action";
import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction } from "react";
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
import { useUser } from "@clerk/nextjs";
import { CategoryType } from "../types/category.type";
import CategoryMenuButton from "./CategoryMenuButton";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, RefreshCcw } from "lucide-react";
import { TrackChart } from "@/features/transaction/components/TransactionChart";
import TransactionButton from "@/features/transaction/components/TransactionButton";
import Loader from "@/components/Loader";
import TransactionCard from "@/features/transaction/components/TransactionCard";

export default function CategoryDrawer({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: CategoryType | null;
  setSelectedCategory: Dispatch<SetStateAction<CategoryType | null>>;
}) {
  const { user } = useUser();

  const userId: CategoryType["_id"] = user?.publicMetadata.dbUserId as string;

  const {
    data: transactions,
    isPending: transactionsLoading,
    refetch: reLoadTransactions,
  } = useQuery({
    queryKey: ["transaction", selectedCategory?._id],
    queryFn: () =>
      fetchTransactionsByDateRange(
        userId,
        selectedCategory?._id!,
        new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
        new Date().toISOString()
      ),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

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
    <div>
      <Drawer
        open={!!selectedCategory}
        onOpenChange={() => setSelectedCategory(null)}
      >
        <DrawerContent className="h-[100dvh] max-w-3xl m-auto">
          <DrawerHeader className="flex">
            <CategoryMenuButton
              categoryId={selectedCategory?._id!}
              className="absolute right-4 top-4"
            />
            <div className="flex gap-2 items-center">
              <DrawerTitle>{selectedCategory?.name}</DrawerTitle>
              <DrawerDescription>
                Category details and transactions
              </DrawerDescription>
            </div>
            {/* <DrawerClose asChild className="absolute right-4 top-4 ">
              <Button
                variant="outline"
                className="rounded-full size-8 border-2 border-primary p-0"
              >
                <Plus className="rotate-45 size-4" />
              </Button>
            </DrawerClose> */}
          </DrawerHeader>
          <ScrollArea className="h-full">
            <TrackChart
              chartData={transactions?.chartData!}
              chartConfig={chartConfig}
            />
            <TransactionButton categoryId={selectedCategory?._id!} />

            {transactionsLoading ? (
              <Loader />
            ) : (
              <div className="p-4 space-y-1">
                {transactions?.transactions?.length! > 0 ? (
                  transactions?.transactions?.map((transaction) => (
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

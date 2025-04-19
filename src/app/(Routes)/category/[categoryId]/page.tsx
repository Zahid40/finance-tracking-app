"use client";
import { fetchCategories } from "@/actions/category.action";
import { fetchTransactionsByDateRange } from "@/actions/transaction.action";
import Loader from "@/components/Loader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoryMenuButton from "@/features/category/components/CategoryMenuButton";
import { CategoryType } from "@/features/category/types/category.type";
import TransactionButton from "@/features/transaction/components/TransactionButton";
import TransactionCard from "@/features/transaction/components/TransactionCard";
import { TrackChart } from "@/features/transaction/components/TransactionChart";
import { currencyFormatter } from "@/utils/currencyFormatter.utils";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { formatDistance, formatRelative, subDays } from "date-fns";
import { Clock2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

export default function CategoryPerPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { user } = useUser();
  const userId = user?.publicMetadata.dbUserId as string;

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

  const selectedCategory = categories?.find(
    (category) => category._id === categoryId
  );

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

  if (categoriesLoading) {
    return <Loader />;
  }
  if (!selectedCategory) {
    return <p>Category not found</p>;
  }

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
    <div className="flex h-full flex-col">
      <div>
        <div className="  pt-4    flex justify-between items-center flex-col gap-4">
          <div className="flex w-full justify-between  gap-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className="bg-primary-900 text-xl text-primary-100 font-medium">
                  {selectedCategory.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm font-semibold">{selectedCategory.name}</p>
            </div>

            <CategoryMenuButton
              categoryId={selectedCategory?._id!}
              className=""
            />
          </div>
          <p className="text-4xl flex flex-col items-center gap-2">
            {currencyFormatter(selectedCategory.current_balance, 0)}
            <span className="text-[11px] flex gap-1 items-center leading-none">
              updated{" "}
              {formatDistance(
                subDays(new Date(selectedCategory.updatedAt), 0),
                new Date(),
                { addSuffix: true }
              )}
            </span>
          </p>
        </div>
        <TrackChart
          chartData={transactions?.chartData!}
          chartConfig={chartConfig}
        />
        <TransactionButton categoryId={selectedCategory?._id!} />
      </div>
      <div className=" w-full h-full">
        {transactionsLoading ? (
          <Loader />
        ) : (
          <div className="space-y-1">
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
      </div>
    </div>
  );
}

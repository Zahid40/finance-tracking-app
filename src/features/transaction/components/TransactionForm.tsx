"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { revalidateCategories } from "@/features/category/action/category.action";
import { useRouter } from "next/navigation";
import {
  TransactionFormType,
  TransactionType,
} from "../types/transaction.types";
import { TransactionFormSchema } from "../schema/transaction.schema";
import { createTransaction } from "../action/transaction.action";
import { Textarea } from "@/components/ui/textarea";

export function TransactionForm(props: {
  categoryId: TransactionType["categoryId"];
  transactionType: TransactionType["transactionType"];
}) {
  const { user } = useUser();
  const router = useRouter();
  const userId = user?.publicMetadata.dbUserId as string;
  const { categoryId, transactionType: initialTransactionType } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TransactionFormType>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      name: "",
      description: "",
      transactionAmount: 0,
      transactionType: initialTransactionType || "Credit",
    },
  });

  async function onSubmit(data: TransactionFormType) {
    setIsSubmitting(true);
    const finalData: TransactionType = {
      userId,
      categoryId,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const result = await createTransaction(finalData);

      if (result.success) {
        toast.success("Transaction created successfully!");
        form.reset();
        await revalidateCategories();
        router.refresh();
      } else {
        toast.error(
          result.errors?.join(", ") || "Failed to create transaction"
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full ">
      <CardContent className="mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <div className="flex space-x-2">
                      {["Credit", "Debit"].map((type) => (
                        <Button
                          key={type}
                          type="button"
                          variant={field.value === type ? "default" : "outline"}
                          onClick={() => field.onChange(type)}
                          className="flex-1"
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Groceries, Salary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional details here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Create Transaction"}
        </Button>
      </CardFooter>
    </Card>
  );
}

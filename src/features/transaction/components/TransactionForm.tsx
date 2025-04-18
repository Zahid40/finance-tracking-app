"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TransactionFormType,
  TransactionType,
} from "../types/transaction.types";
import { TransactionFormSchema } from "../schema/transaction.schema";
import { createTransaction } from "../../../actions/transaction.action";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function TransactionForm(props: {
  categoryId: TransactionType["categoryId"];
  transactionType: TransactionType["transactionType"];
  isOpen: (open: boolean) => void;
}) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const userId = user?.publicMetadata.dbUserId as string;
  const { categoryId, transactionType: initialTransactionType } = props;

  const form = useForm<TransactionFormType>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      name: "",
      description: "",
      transactionAmount: 0,
      transactionType: initialTransactionType || "Credit",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: TransactionFormType) => {
      const finalData: TransactionType = {
        userId,
        categoryId,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return await createTransaction(finalData);
    },
    onSuccess: (result) => {
      if (result.success) {
        form.reset();
        props.isOpen(false);
        queryClient.invalidateQueries({
          queryKey: ["transaction", categoryId],
        });
        queryClient.invalidateQueries({ queryKey: ["category"] });
      } else {
        toast.error(
          result.errors?.join(", ") || "Failed to create transaction"
        );
      }
    },
    onError: () => {
      toast.error("An unexpected error occurred");
    },
  });

  const onSubmit = (data: TransactionFormType) => mutation.mutate(data);

  return (
    <Card className="w-full">
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
                          variant={
                            field.value === type
                              ? type === "Credit"
                                ? "default"
                                : "destructive"
                              : "outline"
                          }
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
          disabled={mutation.isPending}
          className="w-full"
        >
          {mutation.isPending ? "Submitting..." : "Create Transaction"}
        </Button>
      </CardFooter>
    </Card>
  );
}

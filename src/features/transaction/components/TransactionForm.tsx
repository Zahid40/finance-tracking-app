"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import {
  
  revalidateCategories,
} from "@/features/category/action/category.action";
import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { TransactionFormType } from "../types/transaction.types";
import { TransactionFormSchema } from "../schema/transaction.schema";
import { createTransaction } from "../action/transaction.action";
import { CategoryType } from "@/features/category/types/category.type";

export function TransactionForm(props : { categoryId : CategoryType["_id"]}) {
  const { user } = useUser();
  const router = useRouter();
  const userId = user?.publicMetadata.dbUserId as string;
  const {categoryId} = props;
  const form = useForm<TransactionFormType>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      name: "",
      description: "",
      transactionAmount: 0,
      transactionType: true, // Credit
    },
  });

  async function onSubmit(data: TransactionFormType) {
    // Call server action directly
    const result = await createTransaction(data, userId , categoryId);

    if (result.success) {
      toast.success("Category created successfully!");
      form.reset();
      await revalidateCategories();

      // Trigger a React re-render to reflect updated data

      router.refresh(); // Requires `useRouter` from 'next/navigation'
    } else {
      // Display validation errors or other errors returned by the action
      toast.error(result.errors?.join(", ") || "Failed to create category");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="bg-green-600 text-white">
          <CardTitle className="text-2xl">Create Category</CardTitle>
          <CardDescription className="text-green-100">
            Fill out the form below to create a new category.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-3xl mx-auto py-10"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Bankz" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Category name eg : Bank1 , Investment2
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transactionAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Balance</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="500"
                        type="number"
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? parseFloat(e.target.value)
                              : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Current amount in this category
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

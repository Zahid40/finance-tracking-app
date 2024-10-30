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
import { CategoryFormSchema } from "../schema/category.schema";
import { CategoryFormType, CategoryType } from "../types/category.type";
import { useUser } from "@clerk/nextjs";

export function CategoryForm() {
  const { user } = useUser();
  const form = useForm<CategoryFormType>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
      current_balance: undefined,
    },
  });

  async function onSubmit(values: CategoryFormType) {
    try {
      console.log(values);

      const data: CategoryType = {
        userId: user?.publicMetadata.dbUserId as string,
        ...values,
      };
      console.log(data);
      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (!response.ok) throw new Error("Failed to create category");

      toast.success("Category created successfully!");

      form.reset(); // Reset the form on success
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
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
                name="current_balance"
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

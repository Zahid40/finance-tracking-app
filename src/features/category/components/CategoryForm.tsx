"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CategoryFormSchema } from "../schema/category.schema";
import { CategoryFormType } from "../types/category.type";
import { useUser } from "@clerk/nextjs";
import { createCategory } from "@/actions/category.action";

export function CategoryForm(props: { isOpen: (open: boolean) => void }) {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const userId = user?.publicMetadata.dbUserId as string;

  const form = useForm<CategoryFormType>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
      current_balance: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CategoryFormType) => createCategory(data, userId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Category created successfully!");
        queryClient.invalidateQueries({ queryKey: ["category"] }); // revalidate category list
        form.reset();
        props.isOpen(false);
      } else {
        toast.error(result.errors?.join(", ") || "Failed to create category");
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  function onSubmit(data: CategoryFormType) {
    mutation.mutate(data);
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-background border-none shadow-none">
        <CardContent className="my-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="text-2xl  border-none focus-visible:ring-0 "
                        placeholder="Bank 1"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-sm">with current balance</p>

              <FormField
                control={form.control}
                name="current_balance"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2 text-5xl items-center">
                        <span>₹</span>
                        <Input
                          placeholder="500"
                          type="number"
                          value={field.value || ""}
                          className="border-none text-5xl focus-visible:ring-0 "
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseFloat(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full py-8"
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Adding..." : "Add Category"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

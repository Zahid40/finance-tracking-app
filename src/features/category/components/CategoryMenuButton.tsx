import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2, Ellipsis, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { deleteCategory } from "../../../actions/category.action";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTransitionRouter } from "next-view-transitions";

export default function CategoryMenuButton(props: {
  categoryId: string;
  className?: string;
}) {
  const { categoryId, className } = props;
  const { user } = useUser();
  const userId = user?.publicMetadata.dbUserId as string;
  const queryClient = useQueryClient();
  const router = useTransitionRouter();

  const mutation = useMutation({
    mutationFn: () => deleteCategory(userId, categoryId),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["category"] });
        toast.success(data.message);
        router.push("/category");
      }
    },
    onError: (error) => {
      console.error("Error deleting category:", error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });

  const handleDeleteCategory = () => {
    mutation.mutate();
  };

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"destructive"} size={"icon"}>
            <Trash2 className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete
              category and remove all related transactions from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-2 w-full sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant={"destructive"}
                onClick={handleDeleteCategory} // Pass the function as a callback
                className="w-full gap-2 "
              >
                <Trash2 className="size-4" /> Delete Category
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* <Button variant={"secondary"} size={"icon"}>
        <Edit2 className="size-4" />
      </Button> */}
    </div>
  );
}

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { deleteCategory } from "../../../actions/category.action";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function CategoryMenuButton(props: { categoryId: string , className?: string}) {
  const { categoryId , className } = props;
  const { user } = useUser();
  const userId = user?.publicMetadata.dbUserId as string;

  async function handleDeleteCategory(categoryId: string) {
    try {
      const result = await deleteCategory(userId, categoryId);
      if (result.success) {
        toast.success(result.message); // "Category and related transactions deleted successfully"
      } else {
        toast.error(result.message || "Failed to delete category and transactions");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn("w-8 h-8 flex justify-center items-center bg-secondary rounded-lg" , className)}
      >
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            variant={"ghost"}
            className="w-full"
            onClick={() => handleDeleteCategory(categoryId)} // Pass the function as a callback
          >
            <Trash2 />
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

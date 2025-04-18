import React from "react";
import { TransactionType } from "../types/transaction.types";
import { formatRelative, subDays } from "date-fns";
import { toCapitalizeFirstLetter } from "@/utils/string.utils";
import { currencyFormatter } from "@/utils/currencyFormatter.utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "@/actions/transaction.action";
import { useUser } from "@clerk/nextjs";

interface TransactionCardProps {
  transaction: TransactionType;
}

export default function TransactionCard(props: TransactionCardProps) {
  const { transaction } = props;
  const { user } = useUser();
  const userId = user?.publicMetadata.dbUserId as string;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteTransaction(userId, transaction._id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });
    },
  });

  const handleDeleteTransaction = () => {
    mutation.mutate();
  };
  return (
    <div className="group py-2 px-4 rounded-sm flex justify-between items-center hover:bg-neutral-900 transition-all ease-in-out duration-300">
      <div>
        <p className="text-base font-medium">{transaction.name}</p>

        {transaction.description && (
          <p
            className="text-xs hidden group-hover:flex text-neutral-400 leading-5 

          "
          >
            {transaction.description}
          </p>
        )}
        <p className="text-xs text-neutral-300 ">
          {toCapitalizeFirstLetter(
            formatRelative(
              subDays(new Date(transaction.updatedAt), 0),
              new Date()
            )
          )}
        </p>
      </div>
      <div className="flex flex-col justify-center items-end">
        <p
          className={cn(
            "font-semibold",
            transaction.transactionType === "Credit"
              ? "text-green-500"
              : "text-red-500"
          )}
        >
          {transaction.transactionType === "Credit" ? "+ " : "- "}
          {currencyFormatter(transaction.transactionAmount, 0)}
        </p>
      </div>

      <div>
        <Button
          variant={"ghost"}
          className="w-full"
          onClick={() => handleDeleteTransaction()} // Pass the function as a callback
        >
          <Trash2 />
          Delete
        </Button>
      </div>
    </div>
  );
}

import React from "react";
import { TransactionType } from "../types/transaction.types";
import { formatRelative, subDays } from "date-fns";
import { toCapitalizeFirstLetter } from "@/utils/string.utils";
import { currencyFormatter } from "@/utils/currencyFormatter.utils";
import { cn } from "@/lib/utils";

interface TransactionCardProps {
  transaction: TransactionType;
}

export default function TransactionCard(props: TransactionCardProps) {
  const { transaction } = props;
  return (
    <div className="py-2 px-4 rounded-sm border flex justify-between items-center">
      <div>
        <p className="text-base font-medium">{transaction.name}</p>

        {transaction.description && (
          <p className="text-xs ">{transaction.description}</p>
        )}
      </div>
      <div className="flex flex-col justify-center items-end">
        <p
          className={cn(
            transaction.transactionType === "Credit"
              ? "text-green-600"
              : "text-red-600"
          )}
        >
          {currencyFormatter(transaction.transactionAmount)}
        </p>
      <p className="text-xs text-end">
        {toCapitalizeFirstLetter(
          formatRelative(
            subDays(new Date(transaction.updatedAt), 0),
            new Date()
          )
        )}
      </p>
      </div>

    </div>
  );
}

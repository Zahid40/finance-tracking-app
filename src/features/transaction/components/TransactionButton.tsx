"use client";
import React, { useState } from "react";
import { TransactionType } from "../types/transaction.types";
import { TransactionForm } from "./TransactionForm";
import { Button } from "@/components/ui/button";

import { Plus, Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TransactionButton(props: {
  categoryId: TransactionType["categoryId"];
}) {
  const { categoryId } = props;
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] =
    useState<TransactionType["transactionType"]>("Credit");
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex justify-center items-center w-full m-auto space-x-2 p-4">
          <DialogTrigger asChild className="flex-1">
            <Button
              onClick={() => setTransactionType("Credit")}
              variant="default"
            >
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild className="flex-1">
            <Button
              onClick={() => setTransactionType("Debit")}
              variant="destructive"
            >
              <Minus className="mr-2 h-4 w-4" /> Subtract
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className=" max-w-xl m-auto">
          <DialogHeader>
            <DialogTitle>Transaction</DialogTitle>
            <DialogDescription>
              Fill in the details for your transaction.
            </DialogDescription>
          </DialogHeader>
          <TransactionForm
            categoryId={categoryId}
            transactionType={transactionType}
            isOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

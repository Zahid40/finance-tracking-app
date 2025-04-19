"use client";
import React, { useState } from "react";
import { TransactionType } from "../types/transaction.types";
import { TransactionForm } from "./TransactionForm";
import { Button } from "@/components/ui/button";

import { Plus, Minus } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function TransactionButton(props: {
  categoryId: TransactionType["categoryId"];
}) {
  const { categoryId } = props;
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] =
    useState<TransactionType["transactionType"]>("Credit");
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <div className="flex justify-center items-center w-full m-auto space-x-2 py-4">
          <DrawerTrigger asChild className="flex-1">
            <Button
              onClick={() => setTransactionType("Credit")}
              variant="default"
            >
              <Plus className="mr-2 h-4 w-4" /> Gain
            </Button>
          </DrawerTrigger>
          <DrawerTrigger asChild className="flex-1">
            <Button
              onClick={() => setTransactionType("Debit")}
              variant="destructive"
            >
              <Minus className="mr-2 h-4 w-4" /> Spend
            </Button>
          </DrawerTrigger>
        </div>
        <DrawerContent className=" max-w-xl m-auto">
          <DrawerHeader>
            <DrawerTitle>Add Transaction</DrawerTitle>
            <DrawerDescription>
              Fill in the details for your transaction.
            </DrawerDescription>
          </DrawerHeader>
          <TransactionForm
            categoryId={categoryId}
            transactionType={transactionType}
            isOpen={setOpen}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}

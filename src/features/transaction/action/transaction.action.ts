// /features/transaction/actions/transaction.action.ts

import { z } from "zod";
import Transaction from "../model/transaction.model";
import { TransactionSchema } from "../schema/transaction.schema";
import { connect } from "@/lib/db"; // Ensure this connects to your MongoDB instance
import {
  TransactionFormType,
  TransactionType,
} from "../types/transaction.types";

export const createTransaction = async (
  data: TransactionFormType,
  userId: TransactionType["userId"],
  categoryId: TransactionType["categoryId"]
) => {
  try {
    await connect();

    // Parse and validate data with Zod
    const parsedData = TransactionSchema.omit({
      _id: true,
      createdAt: true,
      updatedAt: true,
    }).parse({
      userId,
      categoryId,
      ...data,
    });

    // Create and save new transaction
    const newTransaction = new Transaction(parsedData);
    await newTransaction.save();

    // Convert Mongoose document to plain object for serialization
    const transactionJson = newTransaction.toObject();

    return { success: true, transaction: transactionJson };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      return { success: false, errors: errorMessages };
    }

    return { success: false, errors: ["Server error occurred."] };
  }
};

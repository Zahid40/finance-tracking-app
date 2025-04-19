"use server";
// /features/transaction/actions/transaction.action.ts

import { z } from "zod";
import Transaction from "../features/transaction/model/transaction.model";
import Category from "@/features/category/model/category.model";
import { TransactionSchema } from "../features/transaction/schema/transaction.schema";
import { connect } from "@/lib/db"; // Ensure this connects to your MongoDB instance
import {
  TransactionType,
  TransactionsChartDataType,
} from "../features/transaction/types/transaction.types";

// Caching function to get categories, using Next.js cache settings
export const fetchTransactions = async (
  userId: string,
  categoryId: string
): Promise<TransactionType[]> => {
  // Connect to the database
  await connect();

  // Fetch categories by userId
  const transactions = await Transaction.find({ userId, categoryId }).lean();

  // Transform the result into the Category type, ensuring _id and userId are strings
  return transactions.map((transaction: any) => ({
    _id: String(transaction._id),
    userId: String(transaction.userId),
    categoryId: String(transaction.categoryId),
    transactionAmount: transaction.transactionAmount,
    transactionType: transaction.transactionType,
    name: transaction.name,
    description: transaction.description,
    createdAt: new Date(transaction.createdAt).toISOString(),
    updatedAt: new Date(transaction.updatedAt).toISOString(),
  })) as TransactionType[];
};

export const fetchTransactionsByDateRange = async (
  userId: string,
  categoryId: string,
  startDate: string,
  endDate: string
): Promise<{
  transactions: TransactionType[];
  chartData: TransactionsChartDataType[];
}> => {
  // Connect to the database
  await connect();

  // Fetch the transactions by userId, categoryId, and date range, sorted by `updatedAt`
  const transactions = await Transaction.find({
    userId,
    categoryId,
    updatedAt: { $gte: startDate, $lte: endDate },
  })
    .sort({ updatedAt: -1 }) // Sort in descending order by date
    .lean();

  // Fetch the category's current balance
  const category = await Category.findById(categoryId);
  if (!category) throw new Error("Category not found");

  // Initialize cumulative balance with the category's current balance
  let cumulativeBalance = category.current_balance;

  // Create chartData array by iterating over transactions in reverse order
  const chartData: TransactionsChartDataType[] = transactions.map(
    (transaction: any) => {
      const { updatedAt, transactionAmount, transactionType } = transaction;

      // Generate a chart data point for this transaction
      const dataPoint: TransactionsChartDataType = {
        date: new Date(updatedAt).toISOString(),
        amount: cumulativeBalance,
        transactionAmount:
          transactionType === "Debit" ? -transactionAmount : transactionAmount,
        transactionType,
      };

      // Adjust cumulative balance for the next iteration
      cumulativeBalance +=
        transactionType === "Credit" ? -transactionAmount : transactionAmount;

      return dataPoint;
    }
  );

  // Reverse chartData to chronological order
  return {
    transactions: transactions.map((transaction: any) => ({
      ...transaction,
      _id: transaction._id?.toString(),
      userId: transaction.userId.toString(),
      categoryId: transaction.categoryId.toString(),
      name: transaction.name,
      transactionAmount: transaction.transactionAmount,
      transactionType: transaction.transactionType,
      createdAt: transaction.createdAt.toISOString(),
      updatedAt: transaction.updatedAt.toISOString(),
    })),
    chartData: chartData.reverse(), // Chronological order
  };
};

export const createTransaction = async (data: TransactionType) => {
  try {
    await connect();

    // Parse and validate data with Zod
    const parsedData = TransactionSchema.parse(data);

    // Retrieve the category to update its balance
    const category = await Category.findById(parsedData.categoryId);
    if (!category) {
      return { success: false, errors: ["Category not found."] };
    }

    // Update the category's current balance based on the transaction type
    if (parsedData.transactionType === "Credit") {
      category.current_balance += parsedData.transactionAmount;
    } else if (parsedData.transactionType === "Debit") {
      category.current_balance -= parsedData.transactionAmount;
      // Ensure balance does not go below zero
      if (category.current_balance < 0) {
        return {
          success: false,
          errors: ["Insufficient balance for debit transaction."],
        };
      }
    }
    category.updatedAt = new Date();

    // Save the updated category balance
    await category.save();

    // Create and save new transaction
    const newTransaction = new Transaction(parsedData);
    await newTransaction.save();

    // Convert Mongoose document to plain object for serialization
    const transactionJson = {
      _id: newTransaction._id.toString(),
      categoryId: newTransaction.categoryId.toString(),
      userId: newTransaction.userId.toString(),
      transactionAmount: newTransaction.transactionAmount,
      transactionType: newTransaction.transactionType,
      name: newTransaction.name,
      description: newTransaction.description,
      createdAt: newTransaction.createdAt.toISOString(),
      updatedAt: newTransaction.updatedAt.toISOString(),
    };

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

export const deleteTransaction = async (
  userId: string,
  transactionId: string
): Promise<{ success: boolean; message?: string }> => {
  await connect();

  try {
    // Step 1: Find the transaction
    const transaction = await Transaction.findOne({
      _id: transactionId,
      userId,
    });
    if (!transaction) {
      return { success: false, message: "Transaction not found." };
    }

    // Step 2: Find the related category
    const category = await Category.findById(transaction.categoryId);
    if (!category) {
      return { success: false, message: "Related category not found." };
    }

    // Step 3: Reverse the effect of the transaction on the category's balance
    if (transaction.transactionType === "Credit") {
      category.current_balance -= transaction.transactionAmount;
    } else if (transaction.transactionType === "Debit") {
      category.current_balance += transaction.transactionAmount;
    }

    // Optional: Ensure balance doesn't go negative (if required)
    if (category.current_balance < 0) {
      return {
        success: false,
        message:
          "Cannot delete this transaction due to resulting negative balance.",
      };
    }

    category.updatedAt = new Date();
    await category.save();

    // Step 4: Delete the transaction
    await Transaction.findByIdAndDelete(transactionId);

    return {
      success: true,
      message: "Transaction deleted and category balance updated.",
    };
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return {
      success: false,
      message: "Failed to delete transaction.",
    };
  }
};

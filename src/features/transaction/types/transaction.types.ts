import { z } from "zod";
import { TransactionSchema, TransactionFormSchema, TransactionUpdateSchema, TransactionsChartDataSchema } from "../schema/transaction.schema";

export type TransactionType = z.infer<typeof TransactionSchema>;

export type TransactionFormType = z.infer<typeof TransactionFormSchema>;

export type TransactionUpdateType = z.infer<typeof TransactionUpdateSchema>;

export type TransactionsChartDataType = z.infer<typeof TransactionsChartDataSchema>
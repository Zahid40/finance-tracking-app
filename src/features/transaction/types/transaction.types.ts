import { z } from "zod";
import { TransactionSchema, TransactionFormSchema, TransactionUpdateSchema } from "../schema/transaction.schema";

export type TransactionType = z.infer<typeof TransactionSchema>;

export type TransactionFormType = z.infer<typeof TransactionFormSchema>;

export type TransactionUpdateType = z.infer<typeof TransactionUpdateSchema>;
import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  TRANS_REF: z.string(),
  CHECKUP: z.string(),
  TRANS_STATUS: z.string(),
  PAN_NUMBER: z.string(),
  DEBIT_ACCT_NO: z.string(),
  CREDIT_ACCT_NO: z.string(),
  TXN_AMOUNT: z.string(),
  VALUE_DATE: z.string(),
  RETRIEVAL_REF_NO: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

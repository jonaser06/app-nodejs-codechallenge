import { Transaction } from "@prisma/client";

import { TransactionModel } from "../model/transaction";

export interface TransactionRepository {
  create(transaction: TransactionModel): Promise<Transaction>;
}
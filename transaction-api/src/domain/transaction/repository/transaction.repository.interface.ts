import { TransactionEntityInterface } from "../entity/transaction.entity.interface";

export interface TransactionRepositoryInterface {
  transfer(
    userId: string,
    to: string,
    amount: number,
    description?: string,
    ...callbacks: TransactionCallback[]
  ): Promise<void>;
  history(userId: string): Promise<TransactionEntityInterface[]>;
}

export interface TransactionCallback {
  (transaction: TransactionEntityInterface, transactionManager?: any): void;
}

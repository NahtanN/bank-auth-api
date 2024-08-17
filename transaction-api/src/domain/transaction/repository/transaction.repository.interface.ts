import { TransactionEntityInterface } from "../entity/transaction.entity.interface";

export interface TransactionRepositoryInterface {
  transfer(
    userId: string,
    to: string,
    amount: number,
    description?: string,
  ): Promise<void>;
  history(userId: string): Promise<TransactionEntityInterface[]>;
}

import { TransactionEntityInterface } from "../entity/transaction.entity.interface";

export interface TransactionServiceInterface {
  deposit(userId: string, amount: number): Promise<{ message: string }>;
  withdraw(userId: string, amount: number): Promise<{ message: string }>;
  transfer(
    userId: string,
    to: string,
    amount: number,
    description?: string,
  ): Promise<{ message: string }>;
  history(userId: string): Promise<TransactionEntityInterface[]>;
  transferDetail(
    userId: string,
    id: string,
  ): Promise<TransactionEntityInterface>;
}

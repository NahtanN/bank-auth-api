import { TransactionEntityInterface } from "../entity/transaction.entity.interface";

export interface TransactionServiceInterface {
  deposit(userId: string, amount: number): Promise<void>;
  withdraw(userId: string, amount: number): Promise<void>;
  transfer(userId: string, to: string, amount: number): Promise<void>;
  history(userId: string): Promise<TransactionEntityInterface[]>;
}

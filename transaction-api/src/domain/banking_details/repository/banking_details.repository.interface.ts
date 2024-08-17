import { BankingDetailsEntityInterface } from "../entity/banking_details.entity.interface";

export interface BankingDetailsRepositoryInterface {
  createBankingDetails(data: BankingDetailsEntityInterface): Promise<void>;
  getBalance(userId: string): Promise<number>;
  deposit(userId: string, amount: number): Promise<void>;
  withdraw(userId: string, amount: number): Promise<void>;
}

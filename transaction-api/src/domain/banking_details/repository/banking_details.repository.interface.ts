import { BankingDetailsEntityInterface } from "../entity/banking_details.entity.interface";

export interface BankingDetailsRepositoryInterface {
  createBankingDetails(data: BankingDetailsEntityInterface): Promise<void>;
  getBalance(userId: string): Promise<{
    bankingDetailsId: string;
    balance: number;
  }>;
  deposit(
    userId: string,
    amount: number,
    ...callbacks: BankingDetailsCallback[]
  ): Promise<void>;
  withdraw(
    userId: string,
    amount: number,
    ...callbacks: BankingDetailsCallback[]
  ): Promise<void>;
}

export interface BankingDetailsCallback {
  (
    bankingDetails: BankingDetailsEntityInterface,
    transactionManager?: any,
  ): void;
}

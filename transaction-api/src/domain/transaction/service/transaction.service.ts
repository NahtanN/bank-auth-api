import { BankingDetailsRepositoryInterface } from "@domain/banking_details/repository/banking_details.repository.interface";
import { TransactionServiceInterface } from "./transaction.service.interface";
import { TransactionRepositoryInterface } from "../repository/transaction.repository.interface";
import { TransactionEntityInterface } from "../entity/transaction.entity.interface";

export class TransactionService implements TransactionServiceInterface {
  constructor(
    private readonly bankingDetailsRepository: BankingDetailsRepositoryInterface,
    private readonly transactionRepository: TransactionRepositoryInterface,
  ) { }

  deposit(userId: string, amount: number): Promise<void> {
    return this.bankingDetailsRepository.deposit(userId, amount);
  }

  withdraw(userId: string, amount: number): Promise<void> {
    return this.bankingDetailsRepository.withdraw(userId, amount);
  }

  transfer(userId: string, to: string, amount: number): Promise<void> {
    return this.transactionRepository.transfer(userId, to, amount);
  }

  history(userId: string): Promise<TransactionEntityInterface[]> {
    return this.transactionRepository.history(userId);
  }
}

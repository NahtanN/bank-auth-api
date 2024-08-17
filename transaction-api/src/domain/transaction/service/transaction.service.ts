import { BankingDetailsRepositoryInterface } from "@domain/banking_details/repository/banking_details.repository.interface";
import { TransactionServiceInterface } from "./transaction.service.interface";
import { TransactionRepositoryInterface } from "../repository/transaction.repository.interface";
import { TransactionEntityInterface } from "../entity/transaction.entity.interface";
import AppException from "@shared/exceptions.shared";

export class TransactionService implements TransactionServiceInterface {
  constructor(
    private readonly bankingDetailsRepository: BankingDetailsRepositoryInterface,
    private readonly transactionRepository: TransactionRepositoryInterface,
  ) { }

  async deposit(userId: string, amount: number): Promise<{ message: string }> {
    await this.bankingDetailsRepository.deposit(userId, amount);

    return {
      message: "Deposito efetuado com sucesso!",
    };
  }

  async withdraw(userId: string, amount: number): Promise<{ message: string }> {
    await this.bankingDetailsRepository.withdraw(userId, amount);
    return {
      message: "Saque efetuado com sucesso!",
    };
  }

  async transfer(
    userId: string,
    to: string,
    amount: number,
    description?: string,
  ): Promise<{ message: string }> {
    if (userId === to) {
      throw AppException.badRequest(
        "Você não pode transferir para você mesmo!",
      );
    }

    await this.transactionRepository.transfer(userId, to, amount, description);
    return {
      message: "Transferência efetuada com sucesso!",
    };
  }

  history(userId: string): Promise<TransactionEntityInterface[]> {
    return this.transactionRepository.history(userId);
  }
}

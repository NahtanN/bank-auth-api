import { BankingDetailsRepositoryInterface } from "@domain/banking_details/repository/banking_details.repository.interface";
import { TransactionServiceInterface } from "./transaction.service.interface";
import { TransactionRepositoryInterface } from "../repository/transaction.repository.interface";
import { TransactionEntityInterface } from "../entity/transaction.entity.interface";
import AppException from "@shared/exceptions.shared";
import { OutboxRepositoryInterface } from "@domain/outbox/repository/outbox.repository.interface";
import { AppEvents } from "@shared/events.shared";

export class TransactionService implements TransactionServiceInterface {
  constructor(
    private readonly bankingDetailsRepository: BankingDetailsRepositoryInterface,
    private readonly transactionRepository: TransactionRepositoryInterface,
    private readonly outboxRepository: OutboxRepositoryInterface,
  ) { }

  async deposit(userId: string, amount: number): Promise<{ message: string }> {
    await this.bankingDetailsRepository.deposit(
      userId,
      amount,
      async (bankingDetails, transactionManager) =>
        this.outboxRepository.create(
          AppEvents.BAKING_DETAILS_UPDATED,
          {
            bankingDetailsId: bankingDetails.bankingDetailsId,
            userId: bankingDetails.userId,
            balance: bankingDetails.balance,
          },
          transactionManager,
        ),
    );

    return {
      message: "Deposito efetuado com sucesso!",
    };
  }

  async withdraw(userId: string, amount: number): Promise<{ message: string }> {
    await this.bankingDetailsRepository.withdraw(
      userId,
      amount,
      async (bankingDetails, transactionManager) =>
        this.outboxRepository.create(
          AppEvents.BAKING_DETAILS_UPDATED,
          {
            bankingDetailsId: bankingDetails.bankingDetailsId,
            userId: bankingDetails.userId,
            balance: bankingDetails.balance,
          },
          transactionManager,
        ),
    );
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

    await this.transactionRepository.transfer(
      userId,
      to,
      amount,
      description,
      async (transaction, transactionManager) =>
        this.outboxRepository.create(
          AppEvents.BAKING_DETAILS_UPDATED,
          {
            bankingDetailsId: transaction.userSenderBankingDetailsId,
            userId: transaction.userSenderId,
            balance: transaction.senderBalanceAfter,
          },
          transactionManager,
        ),
      async (transaction, transactionManager) =>
        this.outboxRepository.create(
          AppEvents.BAKING_DETAILS_UPDATED,
          {
            bankingDetailsId: transaction.userReceiverBankingDetailsId,
            userId: transaction.userReceiverId,
            balance: transaction.receiverBalanceAfter,
          },
          transactionManager,
        ),
    );
    return {
      message: "Transferência efetuada com sucesso!",
    };
  }

  history(userId: string): Promise<TransactionEntityInterface[]> {
    return this.transactionRepository.history(userId);
  }
}

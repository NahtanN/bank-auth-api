import { TransactionService } from "@domain/transaction/service/transaction.service";
import { Injectable } from "@nestjs/common";
import { BankingDetailsRepository } from "../banking_details/repository/banking_details.repository";
import { TransactionRepository } from "./repository/transaction.repository";
import { OutboxRepository } from "../outbox/repository/outbox.repository";

@Injectable()
export class AppTransactionService extends TransactionService {
  constructor(
    bankingDetailsRepository: BankingDetailsRepository,
    transactionRepository: TransactionRepository,
    outboxRepository: OutboxRepository,
  ) {
    super(bankingDetailsRepository, transactionRepository, outboxRepository);
  }
}

import { TransactionService } from "@domain/transaction/service/transaction.service";
import { Injectable } from "@nestjs/common";
import { BankingDetailsRepository } from "../banking_details/repository/banking_details.repository";
import { TransactionRepository } from "./repository/transaction.repository";

@Injectable()
export class AppTransactionService extends TransactionService {
  constructor(
    bankingDetailsRepository: BankingDetailsRepository,
    transactionRepository: TransactionRepository,
  ) {
    super(bankingDetailsRepository, transactionRepository);
  }
}

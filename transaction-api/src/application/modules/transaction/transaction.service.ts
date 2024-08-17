import { TransactionService } from "@domain/transaction/service/transaction.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppTransactionService extends TransactionService {
  constructor() {
    super();
  }
}

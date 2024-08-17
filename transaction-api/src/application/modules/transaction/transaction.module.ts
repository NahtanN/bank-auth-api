import { Module } from "@nestjs/common";
import { TransactionController } from "./transaction.controller";
import { AppTransactionService } from "./transaction.service";

@Module({
  controllers: [TransactionController],
  providers: [
    {
      provide: "TransactionServiceInterface",
      useClass: AppTransactionService,
    },
  ],
  exports: [],
})
export class TransactionModule { }

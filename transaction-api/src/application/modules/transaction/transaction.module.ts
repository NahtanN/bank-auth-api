import { Module } from "@nestjs/common";
import { TransactionController } from "./transaction.controller";
import { AppTransactionService } from "./transaction.service";
import { BankingDetailsModule } from "../banking_details/banking_details.module";
import { TransactionRepository } from "./repository/transaction.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionEntity } from "@infrastructure/database/typeorm/transaction/transaction.typeorm.entity";
import { OutboxModule } from "../outbox/outbox.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    BankingDetailsModule,
    OutboxModule,
  ],
  controllers: [TransactionController],
  providers: [
    {
      provide: "TransactionServiceInterface",
      useClass: AppTransactionService,
    },
    TransactionRepository,
  ],
  exports: [],
})
export class TransactionModule { }

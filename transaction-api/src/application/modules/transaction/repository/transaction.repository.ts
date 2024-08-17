import { TransactionEntity } from "@infrastructure/database/typeorm/transaction/transaction.typeorm.entity";
import { TransactionTypeormRepository } from "@infrastructure/database/typeorm/transaction/transaction.typeorm.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class TransactionRepository extends TransactionTypeormRepository {
  constructor(
    dataSource: DataSource,
    @InjectRepository(TransactionEntity)
    transactionRepository: Repository<TransactionEntity>,
  ) {
    super(dataSource, transactionRepository);
  }
}

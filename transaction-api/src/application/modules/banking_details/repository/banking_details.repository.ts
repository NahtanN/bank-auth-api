import { BankingDetailsEntity } from "@infrastructure/database/typeorm/banking_details/banking_details.typeorm.entity";
import { BankingDetailsTypeormRepository } from "@infrastructure/database/typeorm/banking_details/banking_details.typeorm.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class BankingDetailsRepository extends BankingDetailsTypeormRepository {
  constructor(
    @InjectRepository(BankingDetailsEntity)
    bankingDetailsRepository: Repository<BankingDetailsEntity>,
    dataSource: DataSource,
  ) {
    super(dataSource, bankingDetailsRepository);
  }
}

import { BankingDetailsEntity } from "@infrastructure/database/typeorm/banking_details/banking_details.typeorm.entity";
import { BankingDetailsTypeormRepository } from "@infrastructure/database/typeorm/banking_details/banking_details.typeorm.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class BankingDetailsRepository extends BankingDetailsTypeormRepository {
  constructor(
    @InjectRepository(BankingDetailsEntity)
    bankingDetailsRepository: Repository<BankingDetailsEntity>,
  ) {
    super(bankingDetailsRepository);
  }
}

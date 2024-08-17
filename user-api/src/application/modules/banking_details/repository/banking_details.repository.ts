import { BankingDetailsEntity } from "@infrastructure/database/typeorm/banking_details/banking_details.typeorm.entity";
import { BankingDetailsTypeormRepository } from "@infrastructure/database/typeorm/banking_details/banking_details.typeorm.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class BankingDetailsRepository extends BankingDetailsTypeormRepository {
  constructor(
    @InjectRepository(BankingDetailsEntity)
    bankingDetailsRepository: Repository<BankingDetailsEntity>,
  ) {
    super(bankingDetailsRepository);
  }
}

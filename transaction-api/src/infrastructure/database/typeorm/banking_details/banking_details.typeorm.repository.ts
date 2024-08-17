import { BankingDetailsRepositoryInterface } from "@domain/banking_details/repository/banking_details.repository.interface";
import { Repository } from "typeorm";
import { BankingDetailsEntity } from "./banking_details.typeorm.entity";
import { BankingDetailsEntityInterface } from "@domain/banking_details/entity/banking_details.entity.interface";
import { Logger } from "@nestjs/common";
import AppException from "@shared/exceptions.shared";

export class BankingDetailsTypeormRepository
  implements BankingDetailsRepositoryInterface {
  constructor(
    private readonly bankingDetailsRepository: Repository<BankingDetailsEntity>,
  ) { }

  async createBankingDetails(
    data: BankingDetailsEntityInterface,
  ): Promise<void> {
    try {
      const b = await this.bankingDetailsRepository.save(data);
    } catch (error) {
      Logger.error("Não foi possível salvar os dados bancários.", error);
      throw AppException.internalServerError(
        "Não foi possível salvar os dados bancários.",
      );
    }
  }
}

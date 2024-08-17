import { BankingDetailRepositoryInterface } from "@domain/banking_details/repository/bankind_details.repository.interface";
import { Repository } from "typeorm";
import { BankingDetailsEntity } from "./banking_details.typeorm.entity";
import AppException from "@shared/exceptions.shared";
import { Logger } from "@nestjs/common";

export class BankingDetailsTypeormRepository
  implements BankingDetailRepositoryInterface {
  constructor(
    private readonly bankindDetailRepository: Repository<BankingDetailsEntity>,
  ) { }

  async updateBalance(
    bankingDetailsId: string,
    userId: string,
    balance: number,
  ): Promise<void> {
    try {
      await this.bankindDetailRepository.update(
        { bankingDetailsId, userId },
        { balance },
      );
    } catch (error) {
      Logger.error("Erro ao atualizar saldo do usuário", error);
      throw AppException.internalServerError(
        "Erro ao atualizar saldo do usuário.",
      );
    }
  }
}

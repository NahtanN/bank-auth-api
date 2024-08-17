import { BankingDetailsRepositoryInterface } from "@domain/banking_details/repository/banking_details.repository.interface";
import { DataSource, Repository } from "typeorm";
import { BankingDetailsEntity } from "./banking_details.typeorm.entity";
import { BankingDetailsEntityInterface } from "@domain/banking_details/entity/banking_details.entity.interface";
import { Logger } from "@nestjs/common";
import AppException from "@shared/exceptions.shared";

export class BankingDetailsTypeormRepository
  implements BankingDetailsRepositoryInterface {
  constructor(
    private readonly dataSource: DataSource,
    private readonly bankingDetailsRepository: Repository<BankingDetailsEntity>,
  ) { }

  async createBankingDetails(
    data: BankingDetailsEntityInterface,
  ): Promise<void> {
    try {
      await this.bankingDetailsRepository.save(data);
    } catch (error) {
      Logger.error("Não foi possível salvar os dados bancários.", error);
      throw AppException.internalServerError(
        "Não foi possível salvar os dados bancários.",
      );
    }
  }

  async getBalance(userId: string): Promise<number> {
    const balance = await this.bankingDetailsRepository.findOne({
      where: { userId },
      select: {
        balance: true,
      },
    });
    return balance?.balance || 0;
  }

  async deposit(userId: string, amount: number): Promise<void> {
    const balance = await this.getBalance(userId);
    await this.bankingDetailsRepository.update(
      { userId },
      { balance: balance + amount },
    );
  }

  async withdraw(userId: string, amount: number): Promise<void> {
    const balance = await this.getBalance(userId);
    if (balance < amount) {
      throw AppException.badRequest("Saldo insuficiente.");
    }

    await this.bankingDetailsRepository.update(
      { userId },
      { balance: balance - amount },
    );
  }
}

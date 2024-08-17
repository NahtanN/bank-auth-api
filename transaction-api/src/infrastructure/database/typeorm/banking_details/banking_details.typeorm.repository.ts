import {
  BankingDetailsCallback,
  BankingDetailsRepositoryInterface,
} from "@domain/banking_details/repository/banking_details.repository.interface";
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

  async getTransactionManager() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    return {
      queryRunner,
      manager: queryRunner.manager,
    };
  }

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

  async getBalance(userId: string): Promise<{
    bankingDetailsId: string;
    balance: number;
  }> {
    return this.bankingDetailsRepository.findOne({
      where: { userId },
      select: {
        bankingDetailsId: true,
        balance: true,
      },
    });
  }

  async deposit(
    userId: string,
    amount: number,
    ...callbacks: BankingDetailsCallback[]
  ): Promise<void> {
    const { queryRunner, manager } = await this.getTransactionManager();

    try {
      await queryRunner.startTransaction();

      const { bankingDetailsId, balance } = await this.getBalance(userId);
      const bankingDetails = await manager.save(BankingDetailsEntity, {
        bankingDetailsId,
        userId,
        balance: balance + amount,
      });

      const calls = callbacks.map((callback) =>
        callback(bankingDetails, manager),
      );
      await Promise.all(calls);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw AppException.internalServerError(
        "Não foi possível realizar o depósito.",
      );
    } finally {
      await queryRunner.release();
    }
  }

  async withdraw(
    userId: string,
    amount: number,
    ...callbacks: BankingDetailsCallback[]
  ): Promise<void> {
    const { queryRunner, manager } = await this.getTransactionManager();

    try {
      await queryRunner.startTransaction();
      const { bankingDetailsId, balance } = await this.getBalance(userId);
      if (balance < amount) {
        throw AppException.badRequest("Saldo insuficiente.");
      }

      const bankingDetails = await manager.save(BankingDetailsEntity, {
        bankingDetailsId,
        userId,
        balance: balance - amount,
      });

      const calls = callbacks.map((callback) =>
        callback(bankingDetails, manager),
      );
      await Promise.all(calls);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof AppException) {
        throw error;
      }
      throw AppException.internalServerError(
        "Não foi possível realizar o saque.",
      );
    } finally {
      await queryRunner.release();
    }
  }
}

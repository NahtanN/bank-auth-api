import { TransactionRepositoryInterface } from "@domain/transaction/repository/transaction.repository.interface";

export class TransactionTypeormRepository
  implements TransactionRepositoryInterface {
  async getTransactionManager() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    return {
      queryRunner,
      manager: queryRunner.manager,
    };
  }

  async transfer(userId: string, to: string, amount: number): Promise<void> {
    const balance = await this.getBalance(userId);
    if (balance < amount) {
      throw AppException.badRequest("Saldo insuficiente.");
    }

    const { queryRunner, manager } = await this.getTransactionManager();

    try {
      await queryRunner.startTransaction();

      await manager.update(
        BankingDetailsEntity,
        { userId },
        { balance: balance - amount },
      );

      await manager.increment(
        BankingDetailsEntity,
        { userId: to },
        "balance",
        amount,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw AppException.internalServerError("Erro ao transferir o valor.");
    } finally {
      await queryRunner.release();
    }
  }

  async history(userId: string): Promise<BankingDetailsEntityInterface[]> {
    return this.bankingDetailsRepository.find({
      where: { userId },
    });
  }
}

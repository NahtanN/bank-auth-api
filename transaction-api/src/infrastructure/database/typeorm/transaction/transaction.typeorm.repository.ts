import { TransactionRepositoryInterface } from "@domain/transaction/repository/transaction.repository.interface";
import { TransactionEntity } from "./transaction.typeorm.entity";
import { DataSource, Repository } from "typeorm";
import { TransactionEntityInterface } from "@domain/transaction/entity/transaction.entity.interface";
import AppException from "@shared/exceptions.shared";

export class TransactionTypeormRepository
  implements TransactionRepositoryInterface {
  constructor(
    private dataSource: DataSource,
    private transactionRepository: Repository<TransactionEntity>,
  ) { }

  async getTransactionManager() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    return {
      queryRunner,
      manager: queryRunner.manager,
    };
  }

  async transfer(
    userId: string,
    to: string,
    amount: number,
    description?: string,
  ): Promise<void> {
    const { queryRunner, manager } = await this.getTransactionManager();

    try {
      await queryRunner.startTransaction();

      const [result]: [{ exists: boolean }] = await manager.query(
        `SELECT EXISTS(SELECT 1 FROM users WHERE user_id = $1 AND deleted_at IS NULL)`,
        [to],
      );

      if (!result.exists) {
        throw AppException.badRequest("Usuário não encontrado.");
      }

      const [{ balance: senderBalanceBefore }]: [{ balance: number }] =
        await manager.query(
          `SELECT balance FROM banking_details WHERE user_id = $1`,
          [userId],
        );
      if (senderBalanceBefore < amount) {
        throw AppException.badRequest("Saldo insuficiente.");
      }

      const [[{ balance: senderBalanceAfter }]]: [
        [{ balance: number }],
        number,
      ] = await manager.query(
        `UPDATE banking_details SET balance = balance - $1 WHERE user_id = $2 RETURNING balance`,
        [amount, userId],
      );

      const [{ balance: receiverBalanceBefore }]: [{ balance: number }] =
        await manager.query(
          `SELECT balance FROM banking_details WHERE user_id = $1`,
          [to],
        );

      const [[{ balance: receiverBalanceAfter }]]: [
        [{ balance: number }],
        number,
      ] = await manager.query(
        `UPDATE banking_details SET balance = balance + $1 WHERE user_id = $2 RETURNING balance`,
        [amount, to],
      );

      await manager.query(
        `INSERT INTO transactions (user_sender_id, user_receiver_id, amount, sender_balance_before, 
sender_balance_after, receiver_balance_before, receiver_balance_after, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          userId,
          to,
          amount,
          senderBalanceBefore,
          senderBalanceAfter,
          receiverBalanceBefore,
          receiverBalanceAfter,
          description,
        ],
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof AppException) {
        throw error;
      }
      throw AppException.internalServerError(
        "Não foi possível realizar a transferência.",
      );
    } finally {
      await queryRunner.release();
    }
  }

  async history(userId: string): Promise<TransactionEntityInterface[]> {
    try {
      return this.transactionRepository
        .createQueryBuilder("transaction")
        .leftJoinAndSelect("transaction.userSender", "userSender")
        .leftJoinAndSelect("transaction.userReceiver", "userReceiver")
        .where("user_sender_id = :userId OR user_receiver_id = :userId", {
          userId,
        })
        .getMany();
    } catch (error) {
      throw AppException.internalServerError(
        "Não foi possível buscar o histórico de transações.",
      );
    }
  }
}

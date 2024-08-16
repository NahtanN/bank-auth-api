import UserEntityInterface from "src/domain/user/entity/user.entity.interface";
import UserRepositoryInterface, {
  CreateUserCallback,
} from "src/domain/user/repository/user.repository.interface";
import { DataSource, getManager, Repository } from "typeorm";
import AppException from "src/@shared/exceptions.shared";
import { UserEntity } from "./user.typeorm.entity";

export class UserTypeormRepository implements UserRepositoryInterface {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async getTransactionManager() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    return {
      queryRunner,
      manager: queryRunner.manager,
    };
  }

  async create(
    userId: string,
    name: string,
    email: string,
    cpf: string,
    acceptedAt: Date,
    createdAt: Date,
    ...callbacks: CreateUserCallback[]
  ): Promise<void> {
    const { queryRunner, manager } = await this.getTransactionManager();

    try {
      await queryRunner.startTransaction();

      const user = await manager.save(UserEntity, {
        userId,
        name: name.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        cpf,
        acceptedAt,
        createdAt,
        bankingDetails: [
          {
            agency: "0001",
            account: Math.floor(1000000 + Math.random() * 9000000).toString(),
          },
        ],
      });

      const calls = callbacks.map((callback) => callback(user, manager));
      await Promise.all(calls);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw AppException.internalServerError("Erro ao criar usuário.");
    } finally {
      await queryRunner.release();
    }
  }

  async find(value: string): Promise<UserEntityInterface | null> {
    value = value.trim().toLowerCase();

    try {
      return this.userRepository.findOne({
        where: [{ email: value }, { cpf: value }],
      });
    } catch (error) {
      throw AppException.internalServerError(
        "Erro ao buscar usuário por email.",
      );
    }
  }
}

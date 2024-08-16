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
    createdAt: Date,
    ...callbacks: CreateUserCallback[]
  ): Promise<void> {
    const { queryRunner, manager } = await this.getTransactionManager();

    try {
      await queryRunner.startTransaction();

      const user = await manager.save(UserEntity, {
        userId,
        name: name.toLowerCase().trim(),
        createdAt,
        bankingDetails: [{}],
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
        where: {
          userId: value,
        },
        relations: {
          bankingDetails: true,
        },
      });
    } catch (error) {
      throw AppException.internalServerError(
        "Erro ao buscar usuário por email.",
      );
    }
  }
}

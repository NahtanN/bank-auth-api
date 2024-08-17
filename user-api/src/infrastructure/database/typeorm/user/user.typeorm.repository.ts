import UserEntityInterface from "src/domain/user/entity/user.entity.interface";
import UserRepositoryInterface, {
  CreateUserCallback,
} from "src/domain/user/repository/user.repository.interface";
import { DataSource, getManager, Repository } from "typeorm";
import AppException from "src/@shared/exceptions.shared";
import { UserEntity } from "./user.typeorm.entity";
import { UpdateUserRequestInterface } from "@domain/user/service/dtos/request/update_user.request.interface";

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
          address: true,
        },
      });
    } catch (error) {
      throw AppException.internalServerError(
        "Erro ao buscar usuário por email.",
      );
    }
  }

  async existsByEmail(id: string, email: string): Promise<boolean> {
    try {
      const [result]: [{ exists: boolean }] = await this.userRepository.query(
        `SELECT EXISTS(SELECT 1 FROM users WHERE email LIKE LOWER(TRIM($1)) AND deleted_at IS NULL AND user_id != $2)`,
        [email, id],
      );

      return result.exists;
    } catch (error) {
      throw AppException.internalServerError(
        "Erro ao verificar existência do email.",
      );
    }
  }

  async update(
    id: string,
    data: UpdateUserRequestInterface,
    ...callbacks: CreateUserCallback[]
  ): Promise<UserEntityInterface> {
    const { queryRunner, manager } = await this.getTransactionManager();

    try {
      await queryRunner.startTransaction();

      const user = await this.userRepository.save({
        userId: id,
        name: data.name,
        email: data.email,
        address: [{ ...data.address, createdBy: id }],
      });

      const calls = callbacks.map((callback) => callback(user, manager));
      await Promise.all(calls);

      await queryRunner.commitTransaction();

      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw AppException.internalServerError("Erro ao atualizar usuário.");
    } finally {
      await queryRunner.release();
    }
  }
}

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
    name: string,
    email: string,
    password: string,
    cpf: string,
    ...callbacks: CreateUserCallback[]
  ): Promise<UserEntityInterface> {
    const { queryRunner, manager } = await this.getTransactionManager();

    try {
      await queryRunner.startTransaction();
      const user = await manager.save(UserEntity, {
        name: name.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        password,
        cpf,
      });

      const calls = callbacks.map((callback) => callback(user, manager));
      await Promise.all(calls);

      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw AppException.internalServerError("Erro ao criar usuário.");
    } finally {
      await queryRunner.release();
    }
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const [result]: [{ exists: boolean }] = await this.userRepository.query(
        `SELECT EXISTS(SELECT 1 FROM users WHERE email LIKE LOWER(TRIM($1)) AND deleted_at IS NULL)`,
        [email],
      );

      return result.exists;
    } catch (error) {
      throw AppException.internalServerError(
        "Erro ao verificar existência do email.",
      );
    }
  }

  async existsByCpf(cpf: string): Promise<boolean> {
    try {
      const [result]: [{ exists: boolean }] = await this.userRepository.query(
        `SELECT EXISTS(SELECT 1 FROM users WHERE cpf LIKE LOWER(TRIM($1)) AND deleted_at IS NULL)`,
        [cpf],
      );

      return result.exists;
    } catch (error) {
      throw AppException.internalServerError(
        "Erro ao verificar existência do CPF.",
      );
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

  async userUpdate(userId: string, name: string, email: string): Promise<void> {
    try {
      console.log(userId, name, email);
      await this.userRepository.save({
        userId,
        name,
        email,
      });
    } catch (error) {
      console.log(error);
      throw AppException.internalServerError("Erro ao atualizar usuário.");
    }
  }
}

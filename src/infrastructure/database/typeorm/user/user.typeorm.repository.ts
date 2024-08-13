import UserEntityInterface from "src/domain/user/entity/user.entity.interface";
import UserRepositoryInterface from "src/domain/user/repository/user.repository.interface";
import { Repository } from "typeorm";
import { UserEntity } from "./user.typorm.entity";
import AppException from "src/@shared/exceptions.shared";

export class UserTypeormRepository implements UserRepositoryInterface {
  constructor(private readonly userRepository: Repository<UserEntity>) {}

  async create(
    name: string,
    email: string,
    password: string,
    cpf: string,
  ): Promise<UserEntityInterface> {
    try {
      const user = await this.userRepository.create({
        name,
        email,
        password,
        cpf,
      });

      return user;
    } catch (error) {}
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.userRepository.query(
        `SELECT EXISTS(SELECT 1 FROM users WHERE email LIKE LOWER(TRIM($1)) AND deleted_at IS NULL)`,
        [email],
      );

      return true;
    } catch (error) {
      throw AppException.internalServerError(
        "Erro ao verificar existência do email.",
      );
    }
  }

  async existsByCpf(cpf: string): Promise<boolean> {
    try {
      const result = await this.userRepository.query(
        `SELECT EXISTS(SELECT 1 FROM users WHERE cpf LIKE LOWER(TRIM($1)) AND deleted_at IS NULL)`,
        [cpf],
      );

      return true;
    } catch (error) {
      throw AppException.internalServerError(
        "Erro ao verificar existência do CPF.",
      );
    }
  }

  findByEmail(email: string): Promise<UserEntityInterface | null> {
    throw new Error("Method not implemented.");
  }
}

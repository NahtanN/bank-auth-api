import UserEntityInterface from "src/domain/user/entity/user.entity.interface";
import UserRepositoryInterface from "src/domain/user/repository/user.repository.interface";
import { Repository } from "typeorm";
import AppException from "src/@shared/exceptions.shared";
import { UserEntity } from "./user.typeorm.entity";

export class UserTypeormRepository implements UserRepositoryInterface {
  constructor(private readonly userRepository: Repository<UserEntity>) {}

  async create(
    name: string,
    email: string,
    password: string,
    cpf: string,
  ): Promise<UserEntityInterface> {
    try {
      const user = await this.userRepository.save({
        name: name.toLowerCase().trim(),
        email: email.toLowerCase().trim(),
        password,
        cpf,
      });

      return user;
    } catch (error) {
      console.log(error);
      throw AppException.internalServerError("Erro ao criar usuário.");
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
}

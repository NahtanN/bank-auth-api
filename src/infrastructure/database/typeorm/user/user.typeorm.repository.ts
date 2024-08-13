import UserEntityInterface from "src/domain/user/entity/user.entity.interface";
import UserRepositoryInterface from "src/domain/user/repository/user.repository.interface";
import { Repository } from "typeorm";
import { UserEntity } from "./user.typorm.entity";

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

  exists(value: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  findByEmail(email: string): Promise<UserEntityInterface | null> {
    throw new Error("Method not implemented.");
  }
}

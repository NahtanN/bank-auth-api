import UserEntityInterface from "../entity/user.entity.interface";
import UserRepositoryInterface from "../repository/user.repository.interface";
import { UserServiceInterface } from "./user.service.interface";

export class UserService implements UserServiceInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) { }

  async updateUser(data: UserEntityInterface): Promise<void> {
    await this.userRepository.userUpdate(data.userId, data.name, data.email);
  }
}

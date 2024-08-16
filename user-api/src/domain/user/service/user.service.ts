import UserEntityInterface from "../entity/user.entity.interface";
import UserRepositoryInterface from "../repository/user.repository.interface";
import { UserServiceInterface } from "./user.service.interface";

export class UserService implements UserServiceInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) { }

  async createUser(payload: Partial<UserEntityInterface>) {
    return this.userRepository.create(
      payload.userId,
      payload.name,
      payload.email,
      payload.cpf,
      payload.acceptedAt,
      payload.createdAt,
    );
  }

  /*async getUser(id: string) {*/
  /*return { id };*/
  /*}*/

  /*async updateUser(id: string) {*/
  /*return { id };*/
  /*}*/

  /*async updateProfilePicture(id: string) {*/
  /*return { id };*/
  /*}*/
}

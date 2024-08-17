import UserEntityInterface from "../entity/user.entity.interface";

export interface UserServiceInterface {
  updateUser(data: UserEntityInterface): Promise<void>;
}

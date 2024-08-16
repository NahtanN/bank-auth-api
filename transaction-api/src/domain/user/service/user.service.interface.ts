import UserEntityInterface from "../entity/user.entity.interface";

export interface UserServiceInterface {
  createUser(payload: Partial<UserEntityInterface>): Promise<void>;
  getUser(id: string): Promise<UserEntityInterface>;
  /*updateUser(id: string): Promise<UserEntityInterface>;*/
  /*updateProfilePicture(id: string): Promise<UserEntityInterface>;*/
}

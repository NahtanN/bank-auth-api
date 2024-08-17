import UserEntityInterface from "../entity/user.entity.interface";

export interface UserServiceInterface {
  createUser(payload: Partial<UserEntityInterface>): Promise<void>;
  getUser(id: string): Promise<UserEntityInterface>;
  updateUser(data: UserEntityInterface): Promise<void>;
  /*updateProfilePicture(id: string): Promise<UserEntitInterface>;*/
}

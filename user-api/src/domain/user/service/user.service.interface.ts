import UserEntityInterface from "../entity/user.entity.interface";
import { UpdateUserRequestInterface } from "./dtos/request/update_user.request.interface";

export interface UserServiceInterface {
  createUser(payload: Partial<UserEntityInterface>): Promise<void>;
  getUser(id: string): Promise<UserEntityInterface>;
  updateUser(
    id: string,
    data: UpdateUserRequestInterface,
  ): Promise<UserEntityInterface>;
  /*updateProfilePicture(id: string): Promise<UserEntityInterface>;*/
}

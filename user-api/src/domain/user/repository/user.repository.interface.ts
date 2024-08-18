import UserEntityInterface from "../entity/user.entity.interface";
import { UpdateUserRequestInterface } from "../service/dtos/request/update_user.request.interface";

export default interface UserRepositoryInterface {
  /**
   * Insert new user into database and return a UserEntity
   * @param name - string
   * @param email - string
   * @param password - string
   * @param features - string[]; should be of AuthorizationFeatures
   * @throws ApiError
   * */
  create(
    userId: string,
    name: string,
    email: string,
    cpf: string,
    acceptedAt: Date,
    createdAt: Date,
    ...callbacks: CreateUserCallback[]
  ): Promise<void>;

  /**
   * Return a UserEntity if `email` or `cpf` is located on `users` table. If not, returns null.
   * @param value - string
   * @returns UserEntity | null
   * @throws ApiError
   * */
  find(value: string): Promise<UserEntityInterface | null>;

  existsByEmail(id: string, email: string): Promise<boolean>;

  update(
    id: string,
    data: UpdateUserRequestInterface,
    ...callbacks: CreateUserCallback[]
  ): Promise<UserEntityInterface>;

  updateProfilePicture(userId: string, profilePicture: string): Promise<void>;
}

export interface CreateUserCallback {
  (user: UserEntityInterface, transactionManager?: any): void;
}

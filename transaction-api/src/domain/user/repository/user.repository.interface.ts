import UserEntityInterface from "../entity/user.entity.interface";

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

  userUpdate(userId: string, name: string): Promise<void>;
}

export interface CreateUserCallback {
  (user: UserEntityInterface, transactionManager?: any): void;
}

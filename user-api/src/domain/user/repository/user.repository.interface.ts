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
}

export interface CreateUserCallback {
  (user: UserEntityInterface, transactionManager?: any): void;
}

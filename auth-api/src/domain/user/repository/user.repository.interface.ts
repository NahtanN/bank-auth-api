import UserEntityInterface from "../entity/user.entity.interface";

export default interface UserRepositoryInterface {
  /**
   * Validate if `email` is already in use
   * @param email string
   * */
  existsByEmail(email: string): Promise<boolean>;

  /**
   * Validate if `cpf` is already in use
   * @param cpf string
   * */
  existsByCpf(cpf: string): Promise<boolean>;

  /**
   * Insert new user into database and return a UserEntity
   * @param name - string
   * @param email - string
   * @param password - string
   * @param features - string[]; should be of AuthorizationFeatures
   * @throws ApiError
   * */
  create(
    name: string,
    email: string,
    password: string,
    cpf: string,
    ...callbacks: CreateUserCallback[]
  ): Promise<UserEntityInterface>;

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

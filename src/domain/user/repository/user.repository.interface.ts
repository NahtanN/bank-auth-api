import UserEntityInterface from "../entity/user.entity.interface";

export default interface UserRepositoryInterface {
  /**
   * Validate if user already on the database. `value` should be an `email` or `cpf`
   * @param email string
   * */
  exists(value: string): Promise<boolean>;

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
  ): Promise<UserEntityInterface>;

  /**
   * Return a UserEntity if `email` is located on `users` table. If not, returns null.
   * @param email - string
   * @returns UserEntity | null
   * @throws ApiError
   * */
  findByEmail(email: string): Promise<UserEntityInterface | null>;
}

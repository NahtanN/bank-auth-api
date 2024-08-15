export default interface SignInRequestInterface {
  /**
   * Could be a email or a `cpf`
   * */
  login: string;
  password: string;
}

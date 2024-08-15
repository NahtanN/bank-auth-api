import DefaultResponseInterface from "src/domain/@shared/response/default_response.interface";
import SignInRequestInterface from "./dtos/request/sign_in.request.interface";
import SignUpRequestInterface from "./dtos/request/sing_up.request.interface";
import SignInResponseInterface from "./dtos/response/sign_in.response.interface";

export default interface AuthenticationServiceInterface {
  signUp(dto: SignUpRequestInterface): Promise<DefaultResponseInterface>;
  signIn(dto: SignInRequestInterface): Promise<SignInResponseInterface>;
  createJwtToken(payload: Record<string, any>): string;
  hashPassword(password: string): {
    salt: string;
    hash: string;
  };
}

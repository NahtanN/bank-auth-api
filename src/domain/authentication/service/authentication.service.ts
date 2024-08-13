import JwtServiceInterface from "src/infrastructure/jwt_service/jwt.service.interface";
import AuthenticationServiceInterface from "./authentication.service.interface";
import UserRepositoryInterface from "src/domain/user/repository/user.repository.interface";
import SignUpRequestInterface from "./dtos/request/sing_up.request.interface";
import DefaultResponseInterface from "src/domain/@shared/response/default_response.interface";
import AppException from "src/@shared/exceptions.shared";
import UserEntity from "src/domain/user/entity/user.entity";
import SignInRequestInterface from "./dtos/request/sign_in.request.interface";
import SignInResponseInterface from "./dtos/response/sign_in.response.interface";
import { pbkdf2Sync, randomBytes } from "crypto";

export default class AuthenticationService
  implements AuthenticationServiceInterface {
  constructor(
    private readonly jwtService: JwtServiceInterface,
    private readonly userRepository: UserRepositoryInterface,
  ) { }

  async signUp(dto: SignUpRequestInterface): Promise<DefaultResponseInterface> {
    const userExists = await this.userRepository.existsByEmail(dto.email);
    if (userExists) {
      throw AppException.unauthorized("Email já está em uso.");
    }

    // TODO: validate password strength
    const encodedPassword = this.hashPassword(dto.password);

    const user: UserEntity = await this.userRepository.create(
      dto.name,
      dto.email,
      `${encodedPassword.salt}.${encodedPassword.hash}`,
      dto.cpf,
    );

    return {
      message: "Usuário cadastrado com sucesso.",
    };
  }

  async signIn(dto: SignInRequestInterface): Promise<SignInResponseInterface> {
    let user: UserEntity | null;
    try {
      user = await this.userRepository.findByEmail(dto.login);
    } catch (error) {
      throw AppException.internalServerError(
        "Não foi possível procurar o usuário.",
      );
    }
    if (!user) {
      throw AppException.badRequest("Usuário ou senha inválidos.");
    }

    const isValid = this.validatePassword(dto.password, user.password);
    if (!isValid) {
      throw AppException.badRequest("Usuário ou senha inválidos.");
    }

    const accessToken = this.createJwtToken({
      id: user.userId,
    });

    return {
      accessToken,
    };
  }

  createJwtToken(payload: Record<string, any>): string {
    return this.jwtService.sign(payload);
  }

  hashPassword(password: string): {
    salt: string;
    hash: string;
  } {
    const salt = randomBytes(32).toString("hex");
    const genHash = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString(
      "hex",
    );

    return {
      salt: salt,
      hash: genHash,
    };
  }

  validatePassword(password: string, hashedPassword: string) {
    const [salt, hash] = hashedPassword.split(".");

    const hashVerify = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString(
      "hex",
    );

    return hash === hashVerify;
  }
}

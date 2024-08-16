import JwtServiceInterface from "@infrastructure/jwt_service/jwt.service.interface";
import AuthenticationService from "./authentication.service";
import UserRepositoryInterface from "@domain/user/repository/user.repository.interface";
import { SpecUtils } from "@shared/utils/spec.utils";
import SignUpRequestInterface from "./dtos/request/sing_up.request.interface";
import AppException from "@shared/exceptions.shared";
import SignInRequestInterface from "./dtos/request/sign_in.request.interface";
import { OutboxRepositoryInterface } from "@domain/outbox/repository/outbox.repository.interface";

describe("AuthService", () => {
  let authService: AuthenticationService;
  let jwtServiceMock: jest.Mocked<JwtServiceInterface>;
  let userRepositoryMock: jest.Mocked<UserRepositoryInterface>;
  let outboxRepositoryMock: jest.Mocked<OutboxRepositoryInterface>;

  const specUtils = new SpecUtils();

  beforeEach(() => {
    jwtServiceMock = specUtils.jwtService() as jest.Mocked<JwtServiceInterface>;
    userRepositoryMock =
      specUtils.userRepository() as jest.Mocked<UserRepositoryInterface>;
    outboxRepositoryMock =
      specUtils.outboxRepository() as jest.Mocked<OutboxRepositoryInterface>;

    authService = new AuthenticationService(
      jwtServiceMock,
      userRepositoryMock,
      outboxRepositoryMock,
    );
  });

  afterEach(() => {
    specUtils.resetAllMocks();
  });

  it("should create a valid password", () => {
    const password = "password";
    const hashedPassword = authService.hashPassword(password);
    const isValid = authService.validatePassword(
      password,
      `${hashedPassword.salt}.${hashedPassword.hash}`,
    );

    expect(isValid).toBe(true);
  });

  describe("signUp", () => {
    it("should return a success message with access token", async () => {
      const dto: SignUpRequestInterface = {
        name: "Foo Bar",
        email: "foo@bar.com",
        password: "password",
        confirmPassword: "password",
        cpf: "12345678901",
      };
      const accessToken = "mockedAccessToken";

      const user = specUtils.mockUser();

      userRepositoryMock.existsByEmail.mockResolvedValueOnce(false);
      userRepositoryMock.existsByCpf.mockResolvedValueOnce(false);
      userRepositoryMock.create.mockResolvedValueOnce(user);
      jwtServiceMock.sign.mockReturnValueOnce(accessToken);

      const response = await authService.signUp(dto);

      expect(response).toEqual({
        message: "Usuário cadastrado com sucesso.",
      });
      expect(userRepositoryMock.create).toHaveBeenCalledWith(
        dto.name,
        dto.email,
        expect.any(String),
        dto.cpf,
        expect.any(Function),
      );
    });

    it("should throw an error if email and CPF is already in use", async () => {
      const dto: SignUpRequestInterface = {
        name: "Foo Bar",
        email: "foo@bar.com",
        password: "password",
        confirmPassword: "password",
        cpf: "12345678901",
      };
      userRepositoryMock.existsByEmail.mockResolvedValueOnce(true);
      userRepositoryMock.existsByCpf.mockResolvedValueOnce(true);

      await expect(authService.signUp(dto)).rejects.toThrow(
        AppException.badRequest("Erro ao cadastrar usuário.", [
          "Email já cadastrado.",
          "CPF já cadastrado.",
        ]),
      );
    });
  });

  describe("signIn", () => {
    it("should return an access token", async () => {
      const dto: SignInRequestInterface = {
        login: "foo@bar.com",
        password: "password",
      };

      const user = specUtils.mockUser();

      userRepositoryMock.find.mockResolvedValueOnce(user);
      jest.spyOn(authService, "validatePassword").mockReturnValueOnce(true);
      jest
        .spyOn(authService, "createJwtToken")
        .mockReturnValueOnce("accessToken");

      const result = await authService.signIn(dto);

      expect(result).toBeDefined();
      expect(typeof result.accessToken).toBe("string");
    });

    it("should fail on user not found", async () => {
      const dto: SignInRequestInterface = {
        login: "foo@bar.com",
        password: "password",
      };

      userRepositoryMock.find.mockResolvedValueOnce(null);
      await expect(authService.signIn(dto)).rejects.toThrow(
        AppException.badRequest("Usuário ou senha inválidos."),
      );
    });

    it("should fail on password validation", async () => {
      const dto: SignInRequestInterface = {
        login: "foo@bar.com",
        password: "password",
      };

      const user = specUtils.mockUser();

      userRepositoryMock.find.mockResolvedValueOnce(user);
      jest.spyOn(authService, "validatePassword").mockReturnValueOnce(false);
      await expect(authService.signIn(dto)).rejects.toThrow(
        AppException.badRequest("Usuário ou senha inválidos."),
      );
    });
  });
});

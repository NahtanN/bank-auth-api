import { randomUUID } from "crypto";
import UserEntityInterface from "src/domain/user/entity/user.entity.interface";
import UserRepositoryInterface from "src/domain/user/repository/user.repository.interface";
import JwtServiceInterface from "src/infrastructure/jwt_service/jwt.service.interface";

export class SpecUtils {
  mockUser(): UserEntityInterface {
    return {
      userId: randomUUID(),
      name: "Foo Bar",
      email: "foo@bar.com",
      password: "password",
      cpf: "12345678901",
      acceptedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
  }

  resetAllMocks() {
    jest.resetAllMocks();
  }

  jwtService(): JwtServiceInterface {
    return {
      sign: jest.fn(),
    };
  }

  userRepository(): UserRepositoryInterface {
    return {
      existsByEmail: jest.fn(),
      existsByCpf: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
    };
  }
}

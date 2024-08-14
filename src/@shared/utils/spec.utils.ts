import { OutboxRepositoryInterface } from "@domain/outbox/repository/outbox.repository.interface";
import { ClientEventEmmiterInterface } from "@infrastructure/client_event_emmiter/client_event_emmiter.service.interface";
import { OutboxEntity } from "@infrastructure/database/typeorm/outbox/outbox.typeorm.entity";
import { randomUUID } from "crypto";
import UserEntityInterface from "src/domain/user/entity/user.entity.interface";
import UserRepositoryInterface from "src/domain/user/repository/user.repository.interface";
import JwtServiceInterface from "src/infrastructure/jwt_service/jwt.service.interface";

export class SpecUtils {
  private generateRandomNumber(): number {
    return Math.floor(Math.random() * 101);
  }

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

  outboxRepository(): OutboxRepositoryInterface {
    return {
      create: jest.fn(),
      markAsFailed: jest.fn(),
      findUnprocessed: jest.fn(),
      markAsProcessed: jest.fn(),
    };
  }

  clientEventEmmiter(): ClientEventEmmiterInterface {
    return {
      emit: jest.fn(),
    };
  }

  mockOutboxEvents(): OutboxEntity[] {
    return [
      {
        id: this.generateRandomNumber(),
        eventType: "USER_CREATED",
        status: "PENDING",
        payload: this.mockUser(),
        createdAt: new Date(),
      },
    ];
  }
}

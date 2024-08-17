import { OutboxRepositoryInterface } from "@domain/outbox/repository/outbox.repository.interface";
import UserEntityInterface from "../entity/user.entity.interface";
import UserRepositoryInterface from "../repository/user.repository.interface";
import { UserServiceInterface } from "./user.service.interface";
import { BankingDetailsEntity } from "@infrastructure/database/typeorm/banking_details/banking_details.typeorm.entity";
import { AppEvents } from "@shared/events.shared";

export class UserService implements UserServiceInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly outboxRepository: OutboxRepositoryInterface,
  ) { }

  async createUser(payload: Partial<UserEntityInterface>) {
    return this.userRepository.create(
      payload.userId,
      payload.name,
      payload.createdAt,
    );
  }

  async getUser(id: string): Promise<UserEntityInterface> {
    return this.userRepository.find(id);
  }
}

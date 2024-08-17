import { OutboxRepositoryInterface } from "@domain/outbox/repository/outbox.repository.interface";
import UserEntityInterface from "../entity/user.entity.interface";
import UserRepositoryInterface from "../repository/user.repository.interface";
import { UserServiceInterface } from "./user.service.interface";
import { BankingDetailsEntity } from "@infrastructure/database/typeorm/banking_details/banking_details.typeorm.entity";
import { AppEvents } from "@shared/events.shared";
import { UpdateUserRequestInterface } from "./dtos/request/update_user.request.interface";

export class UserService implements UserServiceInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly outboxRepository: OutboxRepositoryInterface,
  ) { }

  async createUser(payload: Partial<UserEntityInterface>) {
    return this.userRepository.create(
      payload.userId,
      payload.name,
      payload.email,
      payload.cpf,
      payload.acceptedAt,
      payload.createdAt,
      async (user, transactionManager) =>
        this.outboxRepository.create(
          AppEvents.BANKING_DETAILS_CREATED,
          { ...user.bankingDetails[0] },
          transactionManager,
        ),
    );
  }

  async getUser(id: string): Promise<UserEntityInterface> {
    return this.userRepository.find(id);
  }

  async updateUser(id: string, data: UpdateUserRequestInterface) {
    return this.userRepository.update(id, data);
  }

  /*async updateProfilePicture(id: string) {*/
  /*return { id };*/
  /*}*/
}

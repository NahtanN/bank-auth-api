import { OutboxRepositoryInterface } from "@domain/outbox/repository/outbox.repository.interface";
import UserEntityInterface from "../entity/user.entity.interface";
import UserRepositoryInterface from "../repository/user.repository.interface";
import { UserServiceInterface } from "./user.service.interface";
import { BankingDetailsEntity } from "@infrastructure/database/typeorm/banking_details/banking_details.typeorm.entity";
import { AppEvents } from "@shared/events.shared";
import { UpdateUserRequestInterface } from "./dtos/request/update_user.request.interface";
import AppException from "@shared/exceptions.shared";

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
    let emailExists = false;
    try {
      emailExists = await this.userRepository.existsByEmail(id, data.email);
    } catch (error) {
      throw AppException.internalServerError("Erro ao verificar email.");
    }

    if (emailExists) {
      throw AppException.badRequest("Email já cadastrado.");
    }

    return this.userRepository.update(
      id,
      data,
      async (user, transactionManager) =>
        this.outboxRepository.create(
          AppEvents.USER_UPDATED,
          {
            userId: user.userId,
            name: user.name,
            email: user.email,
          },
          transactionManager,
        ),
    );
  }

  /*async updateProfilePicture(id: string) {*/
  /*return { id };*/
  /*}*/
}

import UserRepositoryInterface from "@domain/user/repository/user.repository.interface";
import { UserService } from "@domain/user/service/user.service";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Ctx, EventPattern, Payload } from "@nestjs/microservices";
import { AppEvents } from "@shared/events.shared";
import { UserRepository } from "./repositories/user.repository";
import { OutboxRepository } from "../outbox/repository/outbox.repository";
import {
  MessageHandlerErrorBehavior,
  RabbitSubscribe,
} from "@golevelup/nestjs-rabbitmq";
import { BANK_EXCHANGE } from "src/application/providers/rabbitmq/config/exchange";
import { FileServiceInterface } from "@domain/files/service/file.service.interface";

@Injectable()
export class AppUserService extends UserService {
  constructor(
    userRepository: UserRepository,
    outboxRepository: OutboxRepository,

    @Inject("FileServiceInterface")
    fileService: FileServiceInterface,
  ) {
    super(userRepository, outboxRepository, fileService);
  }

  @RabbitSubscribe({
    exchange: BANK_EXCHANGE,
    routingKey: AppEvents.USER_CREATED,
    errorBehavior: MessageHandlerErrorBehavior.ACK,
  })
  async handleMessage(message: any) {
    try {
      await this.createUser(message);
    } catch (error) {
      Logger.error("Erro ao criar usuário", error);
    }
  }
}

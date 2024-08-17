import UserRepositoryInterface from "@domain/user/repository/user.repository.interface";
import { UserService } from "@domain/user/service/user.service";
import { Injectable, Logger } from "@nestjs/common";
import { Ctx, EventPattern, Payload } from "@nestjs/microservices";
import { AppEvents } from "@shared/events.shared";
import { UserRepository } from "./repositories/user.repository";
import { OutboxRepository } from "../outbox/repository/outbox.repository";
import {
  MessageHandlerErrorBehavior,
  Nack,
  RabbitSubscribe,
} from "@golevelup/nestjs-rabbitmq";
import { BANK_EXCHANGE } from "src/application/providers/rabbitmq/config/exchange";

@Injectable()
export class AppUserService extends UserService {
  constructor(
    userRepository: UserRepository,
    outboxRepository: OutboxRepository,
  ) {
    super(userRepository, outboxRepository);
  }

  @RabbitSubscribe({
    exchange: BANK_EXCHANGE,
    routingKey: AppEvents.USER_CREATED,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleMessage(message: any) {
    try {
      await this.createUser(message);
      return new Nack();
    } catch (error) {
      Logger.error("Erro ao criar usuário", error);
    }
  }
}

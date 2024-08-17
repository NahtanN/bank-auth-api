import { UserService } from "@domain/user/service/user.service";
import {
  MessageHandlerErrorBehavior,
  RabbitSubscribe,
} from "@golevelup/nestjs-rabbitmq";
import { Injectable, Logger } from "@nestjs/common";
import { AppEvents } from "@shared/events.shared";
import { BANK_EXCHANGE } from "src/application/providers/rabbitmq/config/exchange";
import { UserRepository } from "./repositories/user.repository";

@Injectable()
export class AppUserService extends UserService {
  constructor(userRepository: UserRepository) {
    super(userRepository);
  }

  @RabbitSubscribe({
    exchange: BANK_EXCHANGE,
    routingKey: AppEvents.USER_UPDATED,
    errorBehavior: MessageHandlerErrorBehavior.ACK,
  })
  async handleMessage(message: any) {
    try {
      await this.updateUser(message);
    } catch (error) {
      Logger.error("Erro ao atualizar o usuário.", error);
    }
  }
}

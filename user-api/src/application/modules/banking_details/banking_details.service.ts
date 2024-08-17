import { BankingDetailsService } from "@domain/banking_details/service/banking_details.service";
import {
  MessageHandlerErrorBehavior,
  RabbitSubscribe,
} from "@golevelup/nestjs-rabbitmq";
import { Injectable, Logger } from "@nestjs/common";
import { AppEvents } from "@shared/events.shared";
import { BANK_EXCHANGE } from "src/application/providers/rabbitmq/config/exchange";
import { BankingDetailsRepository } from "./repository/banking_details.repository";

@Injectable()
export class AppBankingDetailsService extends BankingDetailsService {
  constructor(bankingDetailsRepository: BankingDetailsRepository) {
    super(bankingDetailsRepository);
  }

  @RabbitSubscribe({
    exchange: BANK_EXCHANGE,
    routingKey: AppEvents.BAKING_DETAILS_UPDATED,
    errorBehavior: MessageHandlerErrorBehavior.ACK,
  })
  async handleMessage(message: { userId: string; balance: number }) {
    try {
      await this.updateBalance(message.userId, message.balance);
    } catch (error) {
      Logger.error("Erro ao criar usuário", error);
    }
  }
}

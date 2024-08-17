import { Injectable, Logger } from "@nestjs/common";
import { BankingDetailsRepository } from "./repository/banking_details.repository";
import { BankingDetailService } from "@domain/banking_details/service/banking_details.service";
import {
  MessageHandlerErrorBehavior,
  Nack,
  RabbitSubscribe,
} from "@golevelup/nestjs-rabbitmq";
import { BANK_EXCHANGE } from "src/application/providers/rabbitmq/config/exchange";
import { AppEvents } from "@shared/events.shared";

@Injectable()
export class AppBankingDetailsService extends BankingDetailService {
  constructor(bankingDetailsRepository: BankingDetailsRepository) {
    super(bankingDetailsRepository);
  }

  @RabbitSubscribe({
    exchange: BANK_EXCHANGE,
    routingKey: AppEvents.BANKING_DETAILS_CREATED,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleMessage(message: any) {
    try {
      console.log("banking details", message);
      await this.createBankingDetails(message);
      return new Nack();
    } catch (error) {
      Logger.error("Erro ao criar dados bancários", error);
    }
  }
}

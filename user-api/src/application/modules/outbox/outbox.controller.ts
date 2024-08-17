import {
  MessageHandlerErrorBehavior,
  RabbitSubscribe,
} from "@golevelup/nestjs-rabbitmq";
import { Controller } from "@nestjs/common";
import { BANK_EXCHANGE } from "src/application/providers/rabbitmq/config/exchange";

@Controller()
export class OutboxController {
  @RabbitSubscribe({
    exchange: BANK_EXCHANGE,
    routingKey: "teste",
    errorBehavior: MessageHandlerErrorBehavior.ACK,
  })
  async handleMessage(message: any) {
    console.log(message);
    console.log(`Service 1 received message: ${message}`);
  }
}

import { OutboxService } from "@domain/outbox/service/outbox.service";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { OutboxRepository } from "./repository/outbox.repository";
import { RabbitMQClients } from "src/application/providers/rabbitmq/config/clients";
import { ClientProxy } from "@nestjs/microservices";
import {
  AmqpConnection,
  MessageHandlerErrorBehavior,
  RabbitSubscribe,
} from "@golevelup/nestjs-rabbitmq";
import { BANK_EXCHANGE } from "src/application/providers/rabbitmq/config/exchange";
import { AppEvents } from "@shared/events.shared";

@Injectable()
export class AppOutboxService extends OutboxService {
  constructor(
    outboxRepository: OutboxRepository,
    amqpConnection: AmqpConnection,
  ) {
    super(outboxRepository, amqpConnection);
  }

  @Interval(1000)
  async handleEmitEvents() {
    this.emitEvents();
  }

  @RabbitSubscribe({
    exchange: BANK_EXCHANGE,
    routingKey: "teste",
    errorBehavior: MessageHandlerErrorBehavior.ACK,
  })
  async handleMessage(message: any) {
    Logger.log(`Email RMQ Payload:` + JSON.stringify(message));
    console.log(message);
    console.log(`Service 1 received message: ${message}`);
  }
}

import { OutboxService } from "@domain/outbox/service/outbox.service";
import { Inject, Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { OutboxRepository } from "./repository/outbox.repository";
import { RabbitMQClients } from "src/application/providers/rabbitmq/config/clients";
import { ClientProxy } from "@nestjs/microservices";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";

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
}

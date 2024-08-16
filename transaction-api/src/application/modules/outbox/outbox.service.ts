import { OutboxService } from "@domain/outbox/service/outbox.service";
import { Inject, Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { OutboxRepository } from "./repository/outbox.repository";
import { RabbitMQClients } from "src/application/providers/rabbitmq/config/clients";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AppOutboxService extends OutboxService {
  constructor(
    @Inject(RabbitMQClients.USER)
    client: ClientProxy,
    outboxRepository: OutboxRepository,
  ) {
    super(outboxRepository, client);
  }

  @Interval(1000)
  async handleEmitEvents() {
    this.emitEvents();
  }
}

import { OutboxService } from "@domain/outbox/service/outbox.service";
import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { OutboxRepository } from "./repository/outbox.repository";

@Injectable()
export class AppOutboxService extends OutboxService {
  constructor(outboxRepository: OutboxRepository) {
    super(outboxRepository);
  }

  @Interval(1000)
  async handleEmitEvents() {
    this.emitEvents();
  }
}

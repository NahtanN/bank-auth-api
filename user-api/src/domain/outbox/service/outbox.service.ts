import AppException from "@shared/exceptions.shared";
import { OutboxRepositoryInterface } from "../repository/outbox.repository.interface";
import { OutboxServiceInterface } from "./outbox.service.interface";
import { OutboxEntity } from "@infrastructure/database/typeorm/outbox/outbox.typeorm.entity";
import { ClientEventEmmiterInterface } from "@infrastructure/client_event_emmiter/client_event_emmiter.service.interface";
import { BANK_EXCHANGE } from "src/application/providers/rabbitmq/config/exchange";

export class OutboxService implements OutboxServiceInterface {
  constructor(
    private readonly outboxRepository: OutboxRepositoryInterface,
    private brokerConnection: ClientEventEmmiterInterface,
  ) { }

  async emitEvents(): Promise<void> {
    let outboxEvents: OutboxEntity[];
    try {
      outboxEvents = await this.outboxRepository.findUnprocessed();
    } catch (error) {
      throw AppException.internalServerError(
        "Não foi possível buscar os eventos da outbox.",
      );
    }

    const sentEvents = outboxEvents.map(async (event) =>
      this.handleEvent(event),
    );
    await Promise.allSettled(sentEvents);
  }

  async handleEvent(event: OutboxEntity): Promise<void> {
    try {
      await this.brokerConnection.publish(
        BANK_EXCHANGE,
        event.eventType,
        event.payload,
      );
    } catch (error) {
      console.log(error);
    }
  }
}

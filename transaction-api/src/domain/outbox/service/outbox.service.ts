import AppException from "@shared/exceptions.shared";
import { OutboxRepositoryInterface } from "../repository/outbox.repository.interface";
import { OutboxServiceInterface } from "./outbox.service.interface";
import { OutboxEntity } from "@infrastructure/database/typeorm/outbox/outbox.typeorm.entity";
import { ClientEventEmmiterInterface } from "@infrastructure/client_event_emmiter/client_event_emmiter.service.interface";
import { BANK_EXCHANGE } from "../../../application/providers/rabbitmq/config/exchange";
import { Logger } from "@nestjs/common";

export class OutboxService implements OutboxServiceInterface {
  constructor(
    private readonly outboxRepository: OutboxRepositoryInterface,
    private readonly brokerConnection: ClientEventEmmiterInterface,
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
      await this.outboxRepository.markAsProcessed(event.id);
    } catch (error) {
      Logger.error("Erro ao enviar evento para o broker.");
      await this.outboxRepository.markAsFailed(event.id);
    }
  }
}

import AppException from "@shared/exceptions.shared";
import { OutboxRepositoryInterface } from "../repository/outbox.repository.interface";
import { OutboxServiceInterface } from "./outbox.service.interface";
import { OutboxEntity } from "@infrastructure/database/typeorm/outbox/outbox.typeorm.entity";

export class OutboxService implements OutboxServiceInterface {
  constructor(private readonly outboxRepository: OutboxRepositoryInterface) {}

  async emitEvents() {
    let outboxEvents: OutboxEntity[];
    try {
      outboxEvents = await this.outboxRepository.findUnprocessed();
    } catch (error) {
      throw AppException.internalServerError(
        "Não foi possível buscar os eventos da outbox.",
      );
    }

    console.log(outboxEvents);
  }
}

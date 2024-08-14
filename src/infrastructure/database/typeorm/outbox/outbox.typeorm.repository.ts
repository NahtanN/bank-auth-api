import { OutboxRepositoryInterface } from "@domain/outbox/repository/outbox.repository.interface";
import { Repository } from "typeorm";
import { OutboxEntity } from "./outbox.typeorm.entity";
import AppException from "@shared/exceptions.shared";

export class OutboxTypeormRepository implements OutboxRepositoryInterface {
  constructor(private readonly outboxRepository: Repository<OutboxEntity>) {}

  async create(eventType: string, payload: Record<string, any>): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findUnprocessed(): Promise<OutboxEntity[]> {
    try {
      return this.outboxRepository.find({ where: { status: "pending" } });
    } catch (error) {
      throw AppException.internalServerError(
        "Falha ao buscar eventos pendentes.",
      );
    }
  }

  async markAsFailed(id: number): Promise<void> {
    try {
      await this.outboxRepository.save({ id, status: "failed" });
    } catch (error) {
      throw AppException.internalServerError(
        "Falha ao marcar evento como falhado.",
      );
    }
  }

  async markAsProcessed(id: number): Promise<void> {
    try {
      await this.outboxRepository.save({ id, status: "processed" });
    } catch (error) {
      throw AppException.internalServerError(
        "Falha ao marcar evento como processado.",
      );
    }
  }
}

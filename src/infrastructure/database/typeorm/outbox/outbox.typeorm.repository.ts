import { OutboxRepositoryInterface } from "@domain/outbox/repository/outbox.repository.interface";
import { EntityManager, Repository } from "typeorm";
import { OutboxEntity } from "./outbox.typeorm.entity";
import AppException from "@shared/exceptions.shared";
import { OutboxStatus } from "@domain/outbox/constant";

export class OutboxTypeormRepository implements OutboxRepositoryInterface {
  constructor(private readonly outboxRepository: Repository<OutboxEntity>) {}

  async create(
    eventType: string,
    payload: Record<string, any>,
    transactionManager: EntityManager,
  ): Promise<void> {
    try {
      await transactionManager.save(OutboxEntity, {
        eventType,
        payload,
        status: OutboxStatus.PENDING,
      });
    } catch (error) {
      throw AppException.internalServerError(
        "Falha ao criar evento na outbox.",
      );
    }
  }

  async findUnprocessed(): Promise<OutboxEntity[]> {
    try {
      return this.outboxRepository.find({
        where: { status: OutboxStatus.PENDING },
      });
    } catch (error) {
      throw AppException.internalServerError(
        "Falha ao buscar eventos pendentes.",
      );
    }
  }

  async markAsFailed(id: number): Promise<void> {
    try {
      await this.outboxRepository.save({ id, status: OutboxStatus.FAILED });
    } catch (error) {
      throw AppException.internalServerError(
        "Falha ao marcar evento como falhado.",
      );
    }
  }

  async markAsProcessed(id: number): Promise<void> {
    try {
      await this.outboxRepository.save({ id, status: OutboxStatus.PROCESSED });
    } catch (error) {
      throw AppException.internalServerError(
        "Falha ao marcar evento como processado.",
      );
    }
  }
}

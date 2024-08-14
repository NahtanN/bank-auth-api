import { OutboxEntityInterface } from "../entity/outbox.entity.interface";

export interface OutboxRepositoryInterface {
  create(eventType: string, payload: Record<string, any>): Promise<void>;
  findUnprocessed(): Promise<OutboxEntityInterface[]>;
  markAsProcessed(id: number): Promise<void>;
  markAsFailed(id: number): Promise<void>;
}

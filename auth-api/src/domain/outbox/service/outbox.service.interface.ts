import { OutboxEntity } from "@infrastructure/database/typeorm/outbox/outbox.typeorm.entity";

export interface OutboxServiceInterface {
  emitEvents(): Promise<void>;
  handleEvent(event: OutboxEntity): void;
}

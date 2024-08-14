import { OutboxEntityInterface } from "@domain/outbox/entity/outbox.entity.interface";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("outbox")
export class OutboxEntity implements OutboxEntityInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  eventType: string;

  @Column({ type: "jsonb" })
  payload: Record<string, any>;

  @Column({ type: "varchar", length: 50, default: "pending" })
  status: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}

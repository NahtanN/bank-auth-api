import { OutboxEntity } from "@infrastructure/database/typeorm/outbox/outbox.typeorm.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OutboxRepository } from "./repository/outbox.repository";
import { AppOutboxService } from "./outbox.service";
import { RMQModule } from "src/application/providers/rabbitmq/rabbitmq.module";

@Module({
  imports: [TypeOrmModule.forFeature([OutboxEntity]), RMQModule],
  providers: [OutboxRepository, AppOutboxService],
  controllers: [],
  exports: [OutboxRepository],
})
export class OutboxModule { }

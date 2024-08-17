import { OutboxEntity } from "@infrastructure/database/typeorm/outbox/outbox.typeorm.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OutboxRepository } from "./repository/outbox.repository";
import { AppOutboxService } from "./outbox.service";
import { ClientsModule } from "@nestjs/microservices";
import { userProcessorQueue } from "src/application/providers/rabbitmq/config/connections";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { BANK_EXCHANGE } from "src/application/providers/rabbitmq/config/exchange";
import { RMQModule } from "src/application/providers/rabbitmq/rabbitmq.module";

@Module({
  imports: [TypeOrmModule.forFeature([OutboxEntity]), RMQModule],
  providers: [OutboxRepository, AppOutboxService],
  controllers: [],
  exports: [OutboxRepository],
})
export class OutboxModule { }

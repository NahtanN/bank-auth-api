import { OutboxEntity } from "@infrastructure/database/typeorm/outbox/outbox.typeorm.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OutboxRepository } from "./repository/outbox.repository";
import { AppOutboxService } from "./outbox.service";
import { ClientsModule } from "@nestjs/microservices";
import { userProcessorQueue } from "src/application/providers/rabbitmq/config/connections";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { BANK_EXCHANGE } from "src/application/providers/rabbitmq/config/exchange";
import { OutboxController } from "./outbox.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([OutboxEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: BANK_EXCHANGE,
          type: "fanout",
        },
      ],
      uri:
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}` +
        `@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}` +
        `/${process.env.RABBITMQ_VHOST}`,
      enableControllerDiscovery: true,
    }),
  ],
  providers: [OutboxRepository, AppOutboxService],
  controllers: [OutboxController],
  exports: [OutboxRepository],
})
export class OutboxModule { }

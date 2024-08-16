import { OutboxEntity } from "@infrastructure/database/typeorm/outbox/outbox.typeorm.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OutboxRepository } from "./repository/outbox.repository";
import { AppOutboxService } from "./outbox.service";
import { ClientsModule } from "@nestjs/microservices";
import { userProcessorQueue } from "src/application/providers/rabbitmq/config/connections";

@Module({
  imports: [
    TypeOrmModule.forFeature([OutboxEntity]),
    ClientsModule.register([userProcessorQueue]),
  ],
  providers: [OutboxRepository, AppOutboxService],
  controllers: [],
  exports: [OutboxRepository],
})
export class OutboxModule { }

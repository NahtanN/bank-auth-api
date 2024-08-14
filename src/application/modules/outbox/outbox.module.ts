import { OutboxEntity } from "@infrastructure/database/typeorm/outbox/outbox.typeorm.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OutboxRepository } from "./repository/outbox.repository";

@Module({
  imports: [TypeOrmModule.forFeature([OutboxEntity])],
  providers: [OutboxRepository],
  controllers: [],
  exports: [OutboxRepository],
})
export class OutboxModule {}

import { OutboxEntity } from "@infrastructure/database/typeorm/outbox/outbox.typeorm.entity";
import { OutboxTypeormRepository } from "@infrastructure/database/typeorm/outbox/outbox.typeorm.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OutboxRepository extends OutboxTypeormRepository {
  constructor(
    @InjectRepository(OutboxEntity)
    outboxRepository: Repository<OutboxEntity>,
  ) {
    super(outboxRepository);
  }
}

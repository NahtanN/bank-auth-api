import { OutboxEntity } from "@infrastructure/database/typeorm/outbox/outbox.typeorm.entity";
import { UserEntity } from "@infrastructure/database/typeorm/user/user.typeorm.entity";

export const entities = [UserEntity, OutboxEntity];

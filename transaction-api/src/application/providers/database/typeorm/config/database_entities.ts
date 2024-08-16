import { AddressEntity } from "@infrastructure/database/typeorm/addresses/address.typeorm.entity";
import { BankingDetailsEntity } from "@infrastructure/database/typeorm/banking_details/banking_details.typeorm.entity";
import { OutboxEntity } from "@infrastructure/database/typeorm/outbox/outbox.typeorm.entity";
import { UserEntity } from "@infrastructure/database/typeorm/user/user.typeorm.entity";

export const entities = [
  UserEntity,
  OutboxEntity,
  BankingDetailsEntity,
  AddressEntity,
];

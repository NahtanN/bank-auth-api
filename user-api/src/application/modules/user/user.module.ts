import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repositories/user.repository";
import { UserEntity } from "@infrastructure/database/typeorm/user/user.typeorm.entity";
import { AppUserService } from "./user.service";
import { UserController } from "./user.controller";
import { OutboxModule } from "../outbox/outbox.module";
import { RMQModule } from "src/application/providers/rabbitmq/rabbitmq.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), OutboxModule],
  controllers: [UserController],
  providers: [
    UserRepository,
    {
      provide: "UserServiceInterface",
      useClass: AppUserService,
    },
  ],
  exports: [UserRepository],
})
export class UserModule { }

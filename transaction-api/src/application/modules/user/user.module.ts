import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repositories/user.repository";
import { UserEntity } from "@infrastructure/database/typeorm/user/user.typeorm.entity";
import { AppUserService } from "./user.service";
import { OutboxModule } from "../outbox/outbox.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), OutboxModule],
  controllers: [],
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

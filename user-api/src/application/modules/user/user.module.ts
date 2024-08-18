import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repositories/user.repository";
import { UserEntity } from "@infrastructure/database/typeorm/user/user.typeorm.entity";
import { AppUserService } from "./user.service";
import { UserController } from "./user.controller";
import { OutboxModule } from "../outbox/outbox.module";
import { RMQModule } from "src/application/providers/rabbitmq/rabbitmq.module";
import { S3Module } from "src/application/providers/files/s3/s3.module";
import { AppS3Service } from "src/application/providers/files/s3/s3.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), OutboxModule, S3Module],
  controllers: [UserController],
  providers: [
    UserRepository,
    {
      provide: "UserServiceInterface",
      useClass: AppUserService,
    },
    {
      provide: "FileServiceInterface",
      useClass: AppS3Service,
    },
  ],
  exports: [UserRepository],
})
export class UserModule { }

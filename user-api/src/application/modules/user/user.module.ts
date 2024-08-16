import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repositories/user.repository";
import { UserEntity } from "@infrastructure/database/typeorm/user/user.typeorm.entity";
import { AppUserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
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

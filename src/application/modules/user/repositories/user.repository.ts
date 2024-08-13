import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTypeormRepository } from "src/infrastructure/database/typeorm/user/user.typeorm.repository";
import { UserEntity } from "src/infrastructure/database/typeorm/user/user.typorm.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository extends UserTypeormRepository {
  constructor(
    @InjectRepository(UserEntity)
    userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
}

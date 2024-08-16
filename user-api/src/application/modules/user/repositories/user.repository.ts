import { UserEntity } from "@infrastructure/database/typeorm/user/user.typeorm.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTypeormRepository } from "src/infrastructure/database/typeorm/user/user.typeorm.repository";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends UserTypeormRepository {
  constructor(
    dataSource: DataSource,
    @InjectRepository(UserEntity)
    userRepository: Repository<UserEntity>,
  ) {
    super(dataSource, userRepository);
  }
}

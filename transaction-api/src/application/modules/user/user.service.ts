import UserRepositoryInterface from "@domain/user/repository/user.repository.interface";
import { UserService } from "@domain/user/service/user.service";
import { Injectable } from "@nestjs/common";
import { Ctx, EventPattern, Payload } from "@nestjs/microservices";
import { AppEvents } from "@shared/events.shared";
import { UserRepository } from "./repositories/user.repository";
import { OutboxRepository } from "../outbox/repository/outbox.repository";

@Injectable()
export class AppUserService extends UserService {
  constructor(
    userRepository: UserRepository,
    outboxRepository: OutboxRepository,
  ) {
    super(userRepository, outboxRepository);
  }
}

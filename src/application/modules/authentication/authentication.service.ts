import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import AuthenticationService from "src/domain/authentication/service/authentication.service";
import { UserRepository } from "../user/repositories/user.repository";
import { OutboxRepository } from "../outbox/repository/outbox.repository";

@Injectable()
export class AppAuthenticationService extends AuthenticationService {
  constructor(
    jwtService: JwtService,
    userRepository: UserRepository,
    outboxRepository: OutboxRepository,
  ) {
    super(jwtService, userRepository, outboxRepository);
  }
}

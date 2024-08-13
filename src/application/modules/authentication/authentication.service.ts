import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import AuthenticationService from "src/domain/authentication/service/authentication.service";
import { UserRepository } from "../user/repositories/user.repository";

@Injectable()
export class AppAuthenticationService extends AuthenticationService {
  constructor(jwtService: JwtService, userRepository: UserRepository) {
    super(jwtService, userRepository);
  }
}

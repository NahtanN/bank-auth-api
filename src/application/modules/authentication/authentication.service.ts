import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import AuthenticationService from "src/domain/authentication/service/authentication.service";

@Injectable()
export class AppAuthenticationService extends AuthenticationService {
  constructor(jwtService: JwtService) {
    super(jwtService);
  }
}

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import AppException from "@shared/exceptions.shared";
import { Observable } from "rxjs";
import * as jwt from "jsonwebtoken";

@Injectable()
export class TokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextType = context.getType<"http" | "rmq">();

    if (contextType === "rmq") {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    if (!authHeader) {
      throw AppException.unauthorized("Authorization header não encontrado.");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw AppException.unauthorized("Token não encontrado.");
    }

    try {
      const decodedToken = jwt.decode(token);
      const userId = decodedToken["id"];

      if (!userId) {
        throw AppException.unauthorized(
          "Id do usuário não encontrado no token.",
        );
      }

      request.headers["userId"] = userId;

      return true;
    } catch (error) {
      throw AppException.unauthorized("Token inválido ou expirado.");
    }
    return true;
  }
}

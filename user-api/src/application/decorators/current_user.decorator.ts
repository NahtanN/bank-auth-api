import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import AppException from "@shared/exceptions.shared";
import { Request } from "express";

export const CurrentUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const jwt = request.headers.authorization;

    const userId = request.headers["userId"];
    if (!userId) throw AppException.unauthorized("Usuário não encontrado.");

    return userId;
  },
);

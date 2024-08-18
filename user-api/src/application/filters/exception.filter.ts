import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { Response } from "express";
import AppException from "src/@shared/exceptions.shared";

@Catch()
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (
      exception instanceof BadRequestException ||
      exception instanceof NotFoundException
    ) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }

    if (!(exception instanceof AppException)) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Erro no servidor.",
      });
    }

    const body: {
      statusCode: number;
      message: string;
      errors?: string[];
    } = {
      statusCode: exception.statusCode,
      message: exception.message,
    };

    if (exception.data) {
      body.errors = exception.data;
    }

    return response.status(exception.statusCode).json(body);
  }
}

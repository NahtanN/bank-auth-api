import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function TransactionWithdrawDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Realizar saque na conta do usuário logado.",
    }),
    ApiHeader({
      name: "Authorization",
      description: "Bearer token",
    }),
    ApiResponse({
      status: 201,
      schema: {
        example: {
          message: "Saque efetuado com sucesso!",
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          message: "Saldo insuficiente.",
          statusCode: 400,
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          message: "Não foi possível realizar o saque.",
          statusCode: 500,
        },
      },
    }),
  );
}

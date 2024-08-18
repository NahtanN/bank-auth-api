import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function TransactionDepositDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Realizar deposito na conta do usuário logado.",
    }),
    ApiHeader({
      name: "Authorization",
      description: "Bearer token",
    }),
    ApiResponse({
      status: 201,
      schema: {
        example: {
          message: "Deposito efetuado com sucesso!",
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          message: "Não foi possível realizar o depósito.",
          statusCode: 500,
        },
      },
    }),
  );
}

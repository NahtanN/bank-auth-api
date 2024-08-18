import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function TransactionTransferDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Realizar transferencia entre contas de usuários.",
    }),
    ApiHeader({
      name: "Authorization",
      description: "Bearer token",
    }),
    ApiResponse({
      status: 201,
      schema: {
        example: {
          message: "Transferência efetuada com sucesso!",
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          message: "Usuário não encontrado.",
          statusCode: 400,
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
          message: "Não foi possível realizar a transferência.",
          statusCode: 500,
        },
      },
    }),
  );
}

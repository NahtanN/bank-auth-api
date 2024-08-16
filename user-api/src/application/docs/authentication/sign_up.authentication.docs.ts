import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function SignUpAuthenticationDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Cadastrar usuário.",
    }),
    ApiResponse({
      status: 201,
      schema: {
        example: {
          message: "Usuário cadastrado com sucesso.",
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          message: [
            "O campo `email` deve ser um email.",
            "O campo `senha` não deve ser vazio.",
          ],
          error: "Bad Request",
          statusCode: 400,
        },
      },
    }),
  );
}

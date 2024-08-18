import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function ProfilePictureDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Atualiza a foto de perfil do usuário logado.",
    }),
    ApiHeader({
      name: "Authorization",
      description: "Bearer token",
    }),
    ApiResponse({
      status: 201,
      schema: {
        example: {
          message: "Foto de perfil atualizada com sucesso.",
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          message: "Erro ao atualizar foto de perfil.",
          statusCode: 500,
        },
      },
    }),
  );
}

import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function UpdateUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Atualiza o usuário logado.",
    }),
    ApiHeader({
      name: "Authorization",
      description: "Bearer token",
    }),
    ApiResponse({
      status: 201,
      schema: {
        example: {
          userId: "d6eccf39-a269-435e-b650-1315e8543b95",
          name: "Teste",
          email: "teste@teste.com",
          address: [
            {
              zipcode: "2345",
              state: "AL",
              city: "Maceió",
              neighborhood: "zxcvcxvzerde",
              street: "asdfad",
              number: "234234",
              createdBy: "d6eccf39-a269-435e-b650-1315e8543b95",
              complement: null,
              addressId: "a13aacb6-8a4e-452e-a355-2759f3dd6615",
              createdAt: "2024-08-18T13:42:01.948Z",
              updatedAt: "2024-08-18T13:42:01.948Z",
              deletedAt: null,
            },
          ],
          profilePicture: null,
          updatedAt: "2024-08-18T13:42:01.948Z",
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          message: "Email já cadastrado.",
          statusCode: 500,
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          message: "Erro ao atualizar usuário.",
          statusCode: 500,
        },
      },
    }),
  );
}

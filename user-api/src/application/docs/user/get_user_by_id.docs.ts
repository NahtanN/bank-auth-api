import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function GetUserByIdDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Busca os detalhes do usuário por Id.",
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
          cpf: "59255978004",
          profilePicture: null,
          acceptedAt: "2024-08-18T13:33:36.892Z",
          createdAt: "2024-08-18T13:33:36.892Z",
          updatedAt: "2024-08-18T13:42:01.948Z",
          deletedAt: null,
          bankingDetails: [
            {
              bankingDetailsId: "95d57866-cf75-48c2-8472-3fc0a0826d74",
              account: "3316578",
              agency: "0001",
              balance: 50,
              userId: "d6eccf39-a269-435e-b650-1315e8543b95",
              createdAt: "2024-08-18T13:33:36.914Z",
              updatedAt: "2024-08-18T13:35:02.349Z",
            },
          ],
          address: [
            {
              addressId: "a13aacb6-8a4e-452e-a355-2759f3dd6615",
              zipcode: "2345",
              state: "AL",
              city: "Maceió",
              neighborhood: "zxcvcxvzerde",
              street: "asdfad",
              number: "234234",
              complement: null,
              createdBy: "d6eccf39-a269-435e-b650-1315e8543b95",
              createdAt: "2024-08-18T13:42:01.948Z",
              updatedAt: "2024-08-18T13:42:01.948Z",
              deletedAt: null,
            },
          ],
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          message: "Erro ao buscar usuário.",
          statusCode: 500,
        },
      },
    }),
  );
}

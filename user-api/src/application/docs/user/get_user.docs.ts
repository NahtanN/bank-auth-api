import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function GetUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Busca os detalhes do usuário logado.",
    }),
    ApiHeader({
      name: "Authorization",
      description: "Bearer token",
    }),
    ApiResponse({
      status: 201,
      schema: {
        example: {
          userId: "1c440cc0-42fc-48ff-8523-e506aef7dd57",
          name: "foo",
          email: "teste@teste2.com",
          cpf: "27002086090",
          profilePicture: null,
          acceptedAt: "2024-08-18T13:34:14.582Z",
          createdAt: "2024-08-18T13:34:14.582Z",
          updatedAt: "2024-08-18T13:34:14.914Z",
          deletedAt: null,
          bankingDetails: [
            {
              bankingDetailsId: "0f88f8e6-15be-4f59-bdad-51de1350a3cc",
              account: "5470708",
              agency: "0001",
              balance: 50,
              userId: "1c440cc0-42fc-48ff-8523-e506aef7dd57",
              createdAt: "2024-08-18T13:34:14.914Z",
              updatedAt: "2024-08-18T13:35:02.357Z",
            },
          ],
          address: [],
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

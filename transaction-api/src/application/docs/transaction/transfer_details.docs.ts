import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

export function TransactionTransferDetailsDocs() {
  return applyDecorators(
    ApiOperation({
      summary: "Obter detalhes de uma tranferencia entre usuários.",
    }),
    ApiHeader({
      name: "Authorization",
      description: "Bearer token",
    }),
    ApiResponse({
      status: 201,
      schema: {
        example: {
          transactionId: "477bdfd7-d894-496c-b68e-8ac13f0b67b2",
          userSenderId: "45c9d9bc-dbc6-4eb7-86df-b19a883c0eb4",
          userSenderBankingDetailsId: "f189f842-131e-48be-b900-7975e6629f06",
          userReceiverBankingDetailsId: "8aa2d18f-d5e7-4004-9f93-462cc805cb50",
          userReceiverId: "c53af231-4630-47c2-afd6-9f09b6e9a885",
          amount: 40,
          description: "teste",
          senderBalanceBefore: 90,
          senderBalanceAfter: 50,
          receiverBalanceBefore: 0,
          receiverBalanceAfter: 40,
          createdAt: "2024-08-17T23:41:20.380Z",
          userSender: {
            userId: "45c9d9bc-dbc6-4eb7-86df-b19a883c0eb4",
            name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            createdAt: "2024-08-17T23:36:49.350Z",
            updatedAt: "2024-08-17T23:43:14.449Z",
            deletedAt: null,
          },
          userReceiver: {
            userId: "c53af231-4630-47c2-afd6-9f09b6e9a885",
            name: "foo",
            createdAt: "2024-08-17T23:37:25.130Z",
            updatedAt: "2024-08-17T23:37:25.538Z",
            deletedAt: null,
          },
        },
      },
    }),
    ApiInternalServerErrorResponse({
      schema: {
        example: {
          message: "Não foi possível buscar os detalhes da transferência.",
          statusCode: 500,
        },
      },
    }),
  );
}

import { BankingDetailsRepositoryInterface } from "@domain/banking_details/repository/banking_details.repository.interface";
import { OutboxRepositoryInterface } from "@domain/outbox/repository/outbox.repository.interface";
import { TransactionRepositoryInterface } from "../repository/transaction.repository.interface";
import { SpecUtils } from "@shared/utils/spec.utils";
import { TransactionService } from "./transaction.service";
import AppException from "@shared/exceptions.shared";

describe("TransactionService", () => {
  let transactionService: TransactionService;
  let bankingDetailsRepositoryMock: jest.Mocked<BankingDetailsRepositoryInterface>;
  let transactionRepositoryMock: jest.Mocked<TransactionRepositoryInterface>;
  let outboxRepositoryMock: jest.Mocked<OutboxRepositoryInterface>;

  const specUtils = new SpecUtils();

  beforeEach(() => {
    outboxRepositoryMock =
      specUtils.outboxRepository() as jest.Mocked<OutboxRepositoryInterface>;
    bankingDetailsRepositoryMock =
      specUtils.bankingDetailsRepository() as jest.Mocked<BankingDetailsRepositoryInterface>;
    transactionRepositoryMock =
      specUtils.transactionRepository() as jest.Mocked<TransactionRepositoryInterface>;

    transactionService = new TransactionService(
      bankingDetailsRepositoryMock,
      transactionRepositoryMock,
      outboxRepositoryMock,
    );
  });

  afterEach(() => {
    specUtils.resetAllMocks();
  });

  describe("transfer", () => {
    it("should make a transfer", async () => {
      const userId = "user123";
      const to = "user456";
      const amount = 100;
      const description = "description";

      const mockFunction1 = jest.fn();
      const mockFunction2 = jest.fn();

      transactionRepositoryMock.transfer.mockResolvedValueOnce(null);

      const result = await transactionService.transfer(
        userId,
        to,
        amount,
        description,
      );

      expect(result).toEqual({
        message: "Transferência efetuada com sucesso!",
      });
      expect(transactionRepositoryMock.transfer).toHaveBeenCalledWith(
        userId,
        to,
        amount,
        description,
        expect.any(Function),
        expect.any(Function),
      );
    });

    it("should not be able to make a transfer to itself", async () => {
      const userId = "user123";
      const to = "user123";
      const amount = 100;
      const description = "description";
      await expect(
        transactionService.transfer(userId, to, amount, description),
      ).rejects.toThrow(
        AppException.badRequest("Você não pode transferir para você mesmo!"),
      );
    });
  });
});

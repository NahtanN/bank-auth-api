import { TransactionServiceInterface } from "@domain/transaction/service/transaction.service.interface";
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { version } from "os";
import { CurrentUser } from "src/application/decorators/current_user.decorator";
import { DepositDto } from "./dtos/deposit.dto";
import { WithdrawDto } from "./dtos/withdraw.dto";
import { TransferDto } from "./dtos/transfer.dto";
import { TransactionHistoryDocs } from "src/application/docs/transaction/history.docs";
import { TransactionDepositDocs } from "src/application/docs/transaction/deposit.docs";
import { TransactionWithdrawDocs } from "src/application/docs/transaction/withdraw.docs";
import { TransactionTransferDocs } from "src/application/docs/transaction/transfer.docs";
import { TransactionTransferDetailsDocs } from "src/application/docs/transaction/transfer_details.docs";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller({
  version: "1",
})
export class TransactionController {
  constructor(
    @Inject("TransactionServiceInterface")
    private readonly service: TransactionServiceInterface,
  ) { }

  @TransactionHistoryDocs()
  @Get("history")
  async history(@CurrentUser() userId: string) {
    return this.service.history(userId);
  }

  @TransactionDepositDocs()
  @Post("deposit")
  async deposit(@CurrentUser() userId: string, @Body() data: DepositDto) {
    return this.service.deposit(userId, data.amount);
  }

  @TransactionWithdrawDocs()
  @Post("withdraw")
  async withdraw(@CurrentUser() userId: string, @Body() data: WithdrawDto) {
    return this.service.withdraw(userId, data.amount);
  }

  @TransactionTransferDocs()
  @Post("transfer")
  async transfer(@CurrentUser() userId: string, @Body() data: TransferDto) {
    return this.service.transfer(
      userId,
      data.to,
      data.amount,
      data.description,
    );
  }

  @TransactionTransferDetailsDocs()
  @Get("transfer/:id")
  async transferDetail(
    @CurrentUser() userId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.service.transferDetail(userId, id);
  }
}

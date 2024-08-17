import { TransactionServiceInterface } from "@domain/transaction/service/transaction.service.interface";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { version } from "os";
import { CurrentUser } from "src/application/decorators/current_user.decorator";
import { DepositDto } from "./dtos/deposit.dto";
import { WithdrawDto } from "./dtos/withdraw.dto";
import { TransferDto } from "./dtos/transfer.dto";

@Controller({
  version: "1",
})
export class TransactionController {
  constructor(
    @Inject("TransactionServiceInterface")
    private readonly service: TransactionServiceInterface,
  ) { }

  @Post("deposit")
  async deposit(@CurrentUser() userId: string, @Body() data: DepositDto) {
    return this.service.deposit(userId, data.amount);
  }

  @Post("withdraw")
  async withdraw(@CurrentUser() userId: string, @Body() data: WithdrawDto) {
    return this.service.withdraw(userId, data.amount);
  }

  @Post("transfer")
  async transfer(@CurrentUser() userId: string, @Body() data: TransferDto) {
    return this.service.transfer(userId, data.to, data.amount);
  }

  @Post("history")
  async history(@CurrentUser() userId: string) {
    return this.service.history(userId);
  }
}

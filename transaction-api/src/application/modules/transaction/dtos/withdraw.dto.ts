import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

export class WithdrawDto {
  @ApiProperty({
    description: "Valor a ser sacado.",
    example: 100,
  })
  @IsNumber()
  @Min(1)
  amount: number;
}

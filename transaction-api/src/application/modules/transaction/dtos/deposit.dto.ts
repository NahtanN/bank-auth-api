import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, Min } from "class-validator";

export class DepositDto {
  @ApiProperty({
    default: "100",
  })
  @IsNumber()
  @Min(1)
  amount: number;
}

import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TransferDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";

export class TransferDto {
  @IsUUID()
  @IsNotEmpty()
  to: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  description?: string;
}

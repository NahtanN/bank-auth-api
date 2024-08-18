import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";

export class TransferDto {
  @ApiProperty({
    description: "Id do usuário que receberá a transferência",
    example: "f7f9f4d4-3c8b-4c1a-8c1e-4b0f0c5c6a5d",
  })
  @IsUUID()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    description: "Valor da transferência",
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiPropertyOptional({
    description: "Descrição da transferência",
    example: "Pagamento de aluguel",
  })
  @IsOptional()
  description?: string;
}

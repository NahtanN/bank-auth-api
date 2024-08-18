import { UpdateUserRequestInterface } from "@domain/user/service/dtos/request/update_user.request.interface";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class AddressDto {
  @ApiProperty({
    example: "12345678",
    description: "CEP",
  })
  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @ApiProperty({
    example: "SP",
    description: "State",
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    example: "São Paulo",
    description: "City",
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: "Vila Mariana",
    description: "Neighborhood",
  })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({
    example: "Rua Vergueiro",
    description: "Street",
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    example: "123",
    description: "Number",
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiPropertyOptional({
    example: "Apto 123",
    description: "Complement",
  })
  @IsOptional()
  @IsString()
  complement?: string;
}

export class UpdateUserDto implements UpdateUserRequestInterface {
  @ApiProperty({
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "john@doe.com",
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: AddressDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}

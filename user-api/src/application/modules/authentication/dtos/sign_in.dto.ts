import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { IsEmailOrCpf } from "src/application/constraints/is_email_or_cpf.constraint";
import SignInRequestInterface from "src/domain/authentication/service/dtos/request/sign_in.request.interface";

export class SignInDto implements SignInRequestInterface {
  @ApiProperty()
  @IsNotEmpty({
    message: "O campo `login` não pode ser vazio.",
  })
  @IsEmailOrCpf({ message: "O campo `login` deve ser um e-mail ou um CPF." })
  login: string;

  @ApiProperty({
    default: "Password123",
  })
  @IsNotEmpty({
    message: "O campo `senha` não deve ser vazio.",
  })
  password: string;
}

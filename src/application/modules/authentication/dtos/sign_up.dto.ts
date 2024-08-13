import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Validate } from "class-validator";
import { MatchPasswords } from "src/application/constraints/match_password.constraint";
import SignUpRequestInterface from "src/domain/authentication/service/dtos/request/sing_up.request.interface";

export class SignUpDto implements SignUpRequestInterface {
  @ApiProperty({
    default: "Foo",
  })
  @IsNotEmpty({
    message: "O campo `nome` não deve ser vazio.",
  })
  name: string;

  @ApiProperty({
    default: "foo@bar.com",
  })
  @IsNotEmpty({
    message: "O campo `email` não deve ser vazio.",
  })
  @IsEmail(
    {},
    {
      message: "O campo `email` deve ser um email.",
    },
  )
  email: string;

  @ApiProperty({
    default: "#Password123",
  })
  @IsNotEmpty({
    message: "O campo `senha` não deve ser vazio.",
  })
  password: string;

  @ApiProperty({
    default: "#Password123",
  })
  @IsNotEmpty({
    message: "O campo `confirmar senha` não deve ser vazio.",
  })
  @MatchPasswords("password", {
    message: "`Senha` e `Confirmar senha` precisam ser iguais.",
  })
  confirmPassword: string;

  cpf: string;
}

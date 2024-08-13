import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SignInAuthenticationDocs } from "src/application/docs/authentication/sign_in.authentication.docs";
import { SignUpAuthenticationDocs } from "src/application/docs/authentication/sign_up.authentication.docs";
import DefaultResponseInterface from "src/domain/@shared/response/default_response.interface";
import AuthenticationServiceInterface from "src/domain/authentication/service/authentication.service.interface";
import SignInRequestInterface from "src/domain/authentication/service/dtos/request/sign_in.request.interface";
import SignUpRequestInterface from "src/domain/authentication/service/dtos/request/sing_up.request.interface";
import SignInResponseInterface from "src/domain/authentication/service/dtos/response/sign_in.response.interface";
import { SignInDto } from "./dtos/sign_in.dto";
import { SignUpDto } from "./dtos/sign_up.dto";

@ApiTags("authentication")
@Controller({
  path: "authentication",
  version: "1",
})
export class AuthenticationController {
  constructor(
    @Inject("AuthenticationServiceInterface")
    private readonly service: AuthenticationServiceInterface,
  ) {}

  @SignUpAuthenticationDocs()
  @Post("/sign-up")
  signUp(@Body() dto: SignUpDto): Promise<DefaultResponseInterface> {
    return this.service.signUp(dto);
  }

  @SignInAuthenticationDocs()
  @Post("/sign-in")
  signIn(@Body() dto: SignInDto): Promise<SignInResponseInterface> {
    return this.service.signIn(dto);
  }
}

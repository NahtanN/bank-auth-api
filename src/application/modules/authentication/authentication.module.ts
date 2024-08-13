import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationController } from "./authentication.controller";
import { AppAuthenticationService } from "./authentication.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "1d",
        algorithm: "HS384",
      },
      verifyOptions: {
        algorithms: ["HS384"],
      },
    }),
    UserModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: "AuthenticationServiceInterface",
      useClass: AppAuthenticationService,
    },
  ],
})
export class AuthenticationModule {}

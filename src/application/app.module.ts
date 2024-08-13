import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmDatabaseModule } from "./providers/database/typeorm/typeorm.module";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { UserModule } from "./modules/user/user.module";
import { APP_FILTER } from "@nestjs/core";
import HttpExceptionFilter from "./filters/exception.filter";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmDatabaseModule,
    AuthenticationModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

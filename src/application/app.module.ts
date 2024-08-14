import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmDatabaseModule } from "./providers/database/typeorm/typeorm.module";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { UserModule } from "./modules/user/user.module";
import { APP_FILTER } from "@nestjs/core";
import HttpExceptionFilter from "./filters/exception.filter";
import { OutboxModule } from "./modules/outbox/outbox.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmDatabaseModule,
    AuthenticationModule,
    UserModule,
    OutboxModule,
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

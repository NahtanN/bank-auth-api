import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmDatabaseModule } from "./providers/database/typeorm/typeorm.module";
import { UserModule } from "./modules/user/user.module";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import HttpExceptionFilter from "./filters/exception.filter";
import { OutboxModule } from "./modules/outbox/outbox.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TokenGuard } from "./guards/token.guard";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmDatabaseModule,
    UserModule,
    OutboxModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
  ],
})
export class AppModule { }

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmDatabaseModule } from "./providers/database/typeorm/typeorm.module";

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmDatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "src/application/config/database/typeorm/data_source";

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)],
})
export class TypeOrmDatabaseModule {}

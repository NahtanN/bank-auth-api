import { Module } from "@nestjs/common";
import { RMQModule } from "src/application/providers/rabbitmq/rabbitmq.module";
import { AppBankingDetailsService } from "./banking_details.service";
import { BankingDetailsRepository } from "./repository/banking_details.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BankingDetailsEntity } from "@infrastructure/database/typeorm/banking_details/banking_details.typeorm.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BankingDetailsEntity]), RMQModule],
  providers: [BankingDetailsRepository, AppBankingDetailsService],
  exports: [],
})
export class BankingDetailsModule { }

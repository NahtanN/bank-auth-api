import { Module } from "@nestjs/common";
import { OutboxModule } from "../outbox/outbox.module";
import { RMQModule } from "src/application/providers/rabbitmq/rabbitmq.module";
import { BankingDetailService } from "@domain/banking_details/service/banking_details.service";
import { AppBankingDetailsService } from "./banking_details.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BankingDetailsEntity } from "@infrastructure/database/typeorm/banking_details/banking_details.typeorm.entity";
import { BankingDetailsRepository } from "./repository/banking_details.repository";

@Module({
  imports: [TypeOrmModule.forFeature([BankingDetailsEntity]), OutboxModule],
  controllers: [],
  providers: [BankingDetailsRepository, AppBankingDetailsService],
  exports: [BankingDetailsRepository],
})
export class BankingDetailsModule { }

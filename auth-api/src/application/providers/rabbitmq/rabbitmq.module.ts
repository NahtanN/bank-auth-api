import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { userCreatedQueue } from "./config/connections";

@Module({
  imports: [ClientsModule.register([userCreatedQueue])],
})
export class RabbitmqModule {}

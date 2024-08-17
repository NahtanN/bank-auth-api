import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Module } from "@nestjs/common";
import { BANK_EXCHANGE } from "./config/exchange";

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: BANK_EXCHANGE,
          type: "fanout",
        },
      ],
      uri:
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}` +
        `@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: false,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [RabbitMQModule],
})
export class RMQModule { }

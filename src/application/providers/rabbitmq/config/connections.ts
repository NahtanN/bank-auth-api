import "dotenv/config";
import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import { RabbitMQClients } from "./clients";
import { AppEvents } from "@shared/events.shared";

export const userCreatedQueue: ClientProviderOptions = {
  name: RabbitMQClients.USER,
  transport: Transport.RMQ,
  options: {
    urls: [
      `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}` +
        `@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}` +
        `/${process.env.RABBITMQ_VHOST}`,
      `@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}` +
        `/${process.env.RABBITMQ_VHOST}`,
    ],
    prefetchCount: 1,
    queue: AppEvents.USER_CREATED,
    queueOptions: {
      durable: true,
      deadLetterExchange: "",
      deadLetterRoutingKey: process.env.RABBITMQ_QUEUE + "_DLQ",
    },
    maxConnectionAttempts: 3,
  },
};

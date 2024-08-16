import "dotenv/config";
import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import { RabbitMQClients } from "./clients";
import { AppEvents } from "@shared/events.shared";
import { Queues } from "./queues";

const options = {
  urls: [
    `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}` +
    `@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}` +
    `/${process.env.RABBITMQ_VHOST}`,
    `@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}` +
    `/${process.env.RABBITMQ_VHOST}`,
  ],
  prefetchCount: 1,
  queue: Queues.USER,
  queueOptions: {
    durable: true,
    deadLetterExchange: "",
    deadLetterRoutingKey: process.env.RABBITMQ_QUEUE + "_DLQ",
  },
  maxConnectionAttempts: 3,
};

export const userProcessorQueue: ClientProviderOptions = {
  name: RabbitMQClients.USER,
  transport: Transport.RMQ,
  options: options,
};

export const userConsumerQueue: ClientProviderOptions = {
  name: RabbitMQClients.USER,
  transport: Transport.RMQ,
  options: {
    noAck: false,
    ...options,
  },
};

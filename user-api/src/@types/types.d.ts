declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: number;
    APP_URL: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_URL: string;
    DATABASE_SCHEMA: string;
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    JWT_SECRET: string;
    MAX_USER_CONTRACTORS: number;
    JWT_ISSUER: string;
    RABBITMQ_HOST: string;
    RABBITMQ_USER: string;
    RABBITMQ_PASS: string;
    RABBITMQ_PORT: number;
    RABBITMQ_VHOST: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    AWS_BUCKET_NAME: string;
  }
}

import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { entities } from "./database_entities";

export const typeormOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT || 54321,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA,
  entities,
  synchronize: false,
  logging: true,
};

export const AppDataSource = new DataSource(typeormOptions);

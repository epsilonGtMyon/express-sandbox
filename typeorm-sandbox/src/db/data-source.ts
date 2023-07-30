import { DataSource } from "typeorm";
import { Message } from "./message";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  //synchronize: true,
  logging: true,
  entities: [Message],
  subscribers: [],
  migrations: [],
});


export function initializeDataSource(){
  return AppDataSource.initialize()
}

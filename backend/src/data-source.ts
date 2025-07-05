import { DataSource } from "typeorm";
import { User } from "../src/entities/User";
import { JobOffer } from "../src/entities/JobOffer";
import { Application } from "../src/entities/Application";
import dotenv from "dotenv";


dotenv.config()
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, JobOffer, Application],
});

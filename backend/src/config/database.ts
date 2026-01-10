import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { Event } from "../entities/Event";
import { UsersOfEvent } from "../entities/UsersOfEvent";
import { Approval } from "../entities/Approval";
import { Initial1764777528828 } from "../migrations/1764777528828-initial";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // Auto-create tables (set to false in production)
  logging: true,
  entities: [User, Event, UsersOfEvent, Approval],
  migrations: [Initial1764777528828],
  subscribers: [],
});

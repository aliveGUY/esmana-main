import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config()

export const typeOrmConfig = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../models/*.js'],
  migrations: [__dirname + '/../migrations/*.js'],
  synchronize: process.env.NODE_ENV === "development",
  logging: true
});

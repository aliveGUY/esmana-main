import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { UserEntity } from '../entities/user.entity';

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'esmana',
  entities: [UserEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Always false for migrations
  logging: true,
  charset: 'utf8mb4',
  timezone: '+00:00',
});

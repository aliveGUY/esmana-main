import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './AuthModule';
import { TokenAuthGuard } from '../guards/TokenAuthGuard';
import redisConfig from '../config/redis.config';
import tokenConfig from '../config/token.config';
import googleConfig from '../config/google.config';
import databaseConfig from '../config/database.config';
import { User } from '../models/User';
import { UserLecture } from '../models/UserLecture';
import { Course } from '../models/Course';
import { Lecture } from '../models/Lecture';
import { LectureMaterials } from '../models/LectureMaterials';
import { EvaluationQuestion } from '../models/EvaluationQuestion';
import { CourseModule } from './CourseModule';
import { StaticFilesController } from 'src/controllers/StaticFilesController';
import { UserModule } from './UserModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [redisConfig, tokenConfig, googleConfig, databaseConfig],
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        entities: [
          User,
          UserLecture,
          Course,
          Lecture,
          LectureMaterials,
          EvaluationQuestion
        ],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    CourseModule,
    UserModule
  ],
  controllers: [StaticFilesController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: TokenAuthGuard,
    },
  ],
})
export class AppModule { }

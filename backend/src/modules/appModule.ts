import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './usersModule';
import { AuthModule } from './authModule';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { IdentityModule } from './identityModule';
import { NotificationModule } from './notificationModule';
import { CourseModule } from './courseModule';
import { LectureModule } from './lectureModule';
import { CheckoutModule } from './checkoutModule';
import { RedisModule } from './redisModule';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig.options),
    RedisModule,
    UsersModule,
    AuthModule,
    IdentityModule,
    NotificationModule,
    CourseModule,
    LectureModule,
    CheckoutModule
  ],
})

export class AppModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './usersModule';
import { AuthModule } from './authModule';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { IdentityModule } from './identityModule';
import { NotificationModule } from './notificationModule';
import { CourseModule } from './courseModule';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig.options),
    UsersModule,
    AuthModule,
    IdentityModule,
    NotificationModule,
    CourseModule
  ],
})

export class AppModule { }

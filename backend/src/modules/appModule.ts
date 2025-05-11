import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './usersModule';
import { AuthModule } from './authModule';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { CheckoutModule } from './checkoutModule';
import { CoursesModule } from './coursesModule';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig.options),
    UsersModule,
    AuthModule,
    CheckoutModule,
    CoursesModule
  ],
})

export class AppModule { }

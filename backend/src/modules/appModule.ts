import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './usersModule';
import { typeOrmConfig } from 'src/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig.options), UsersModule],
})

export class AppModule { }

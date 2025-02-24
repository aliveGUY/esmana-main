import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './usersModule';
import { AuthModule } from './authModule';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { IdentityModule } from './identityModule';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig.options),
    UsersModule,
    AuthModule,
    IdentityModule
  ],
})

export class AppModule { }

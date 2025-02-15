import { Module } from '@nestjs/common';
import { UsersModule } from './usersModule';

@Module({
  imports: [UsersModule],
})

export class AppModule { }

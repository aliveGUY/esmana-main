import { Module } from '@nestjs/common';
import { UsersController } from 'src/controllers/usersController';
import { UsersService } from 'src/services/usersService';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
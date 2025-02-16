import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/usersController';
import { User } from 'src/models/User';
import { UsersRepository } from 'src/repositories/UsersRepository';
import { UsersService } from 'src/services/usersService';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule { }
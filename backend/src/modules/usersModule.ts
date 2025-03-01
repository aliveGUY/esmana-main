import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/usersController';
import { User } from 'src/models/User';
import { UsersRepository } from 'src/repositories/usersRepository';
import { UsersService } from 'src/services/usersService';
import { IdentityModule } from './identityModule';
import { NotificationModule } from './notificationModule';
import { CourseModule } from './courseModule';

@Module({
  imports: [TypeOrmModule.forFeature([User]), IdentityModule, NotificationModule, CourseModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule { }
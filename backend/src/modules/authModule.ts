import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/authController';
import { AuthGuard } from 'src/guards/AuthGuard';
import { LoginGuard } from 'src/guards/LoginGuard';
import { LogoutGuard } from 'src/guards/LogoutGuard';
import { User } from 'src/models/User';
import { UsersRepository } from 'src/repositories/usersRepository';
import { AuthService } from 'src/services/authService';
import { UsersService } from 'src/services/usersService';
import { LocalStrategy } from 'src/utils/LocalStrategy';
import { SessionSerializer } from 'src/utils/SessionSerializer';
import { IdentityModule } from './identityModule';
import { UsersModule } from './usersModule';
import { NotificationModule } from './notificationModule';
import { CourseModule } from './courseModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true }),
    UsersModule, IdentityModule, NotificationModule, CourseModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UsersRepository,
    SessionSerializer,
    LocalStrategy,
    LoginGuard,
    LogoutGuard,
    AuthGuard
  ],
  exports: [AuthService],
})
export class AuthModule { }

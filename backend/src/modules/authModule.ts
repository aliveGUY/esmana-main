import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/authController';
import { User } from 'src/models/User';
import { UsersRepository } from 'src/repositories/usersRepository';
import { AuthService } from 'src/services/authService';
import { UsersService } from 'src/services/usersService';
import { LocalStrategy } from 'src/utils/LocalStrategy';
import { SessionSerializer } from 'src/utils/SessionSerializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UsersRepository,
    SessionSerializer,
    LocalStrategy
  ],
  exports: [AuthService],
})
export class AuthModule { }

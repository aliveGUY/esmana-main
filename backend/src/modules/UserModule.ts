import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LectureMaterials } from "src/models/LectureMaterials";
import { AuthModule } from "./AuthModule";
import { UserRepository } from "src/repositories/UserRepository";
import { UserController } from "src/controllers/UsersController";
import { User } from "src/models/User";
import { UserService } from "src/services/UserService";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, LectureMaterials]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IUserService',
      useClass: UserService,
    },
  ],
  exports: ['IUserService'],
})
export class UserModule { }

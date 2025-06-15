import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LectureMaterials } from "src/models/LectureMaterials";
import { AuthModule } from "./AuthModule";
import { UserRepository } from "src/repositories/UserRepository";
import { UserController } from "src/controllers/UsersController";
import { User } from "src/models/User";
import { UserService } from "src/services/UserService";
import { LectorDetailsRepository } from "src/repositories/LectorDetailsRepository";
import { LectorDetails } from "src/models/LectorDetails";
import { GoogleModule } from "./GoogleModule";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, LectureMaterials, LectorDetails]),
    AuthModule,
    GoogleModule
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'ILectorDetailsRepository',
      useClass: LectorDetailsRepository
    },
    {
      provide: 'IUserService',
      useClass: UserService,
    },
  ],
  exports: ['IUserService', 'IUserRepository'],
})

export class UserModule { }

import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/models/dto/CreateUserDto";
import { GetUserDto } from "src/models/dto/GetUserDto";

@Injectable()
export class UsersService {
  private users: CreateUserDto[] = [{ username: 'user 1', password: '123' }, { username: 'user 2', password: '123' }, { username: 'user 3', password: '123' }];

  getAllUsers(): GetUserDto[] {
    return this.users
  }

  registerUser(user: CreateUserDto): GetUserDto {
    this.users = [user, ...this.users];
    return user;
  }
}
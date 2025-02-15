import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/models/dto/CreateUserDto";
import { GetUserDto } from "src/models/dto/GetUserDto";
import { User } from "src/models/User";

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      username: 'user 1',
      password: '123'
    },
    {
      id: 2,
      username: 'user 2',
      password: '123'
    },
    {
      id: 3,
      username: 'user 3',
      password: '123'
    }
  ] as User[];

  getAllUsers(): GetUserDto[] {
    return this.users
  }

  registerUser(user: CreateUserDto): GetUserDto {
    const newUser: User = {
      id: Date.now(),
      username: user.username,
      password: user.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.users = [newUser, ...this.users];
    return user;
  }

  deleteUser(id: number): number {
    this.users = this.users.filter(user => user.id !== id)
    return id
  }
}
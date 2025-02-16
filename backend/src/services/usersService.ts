import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/models/dto/CreateUserDto";
import { GetUserDto } from "src/models/dto/GetUserDto";
import { User } from "src/models/User";
import { UsersRepository } from "src/repositories/UsersRepository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async getAllUsers(): Promise<GetUserDto[]> {
    return await this.usersRepository.getAllUsers()
  }

  async registerUser(user: CreateUserDto): Promise<GetUserDto> {
    return await this.usersRepository.saveUser(user as User);
  }

  async deleteUser(id: number): Promise<number> {
    await this.usersRepository.deleteUser(id);
    return id
  }
}
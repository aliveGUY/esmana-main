import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/models/dto/CreateUserDto";
import { GetUserDto } from "src/models/dto/GetUserDto";
import { UsersRepository } from "src/repositories/UsersRepository";
import { hash } from 'bcryptjs';
import { User } from "src/models/User";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async getAllUsers(): Promise<GetUserDto[]> {
    return await this.usersRepository.getAllUsers()
  }

  async registerUser(user: CreateUserDto): Promise<GetUserDto> {
    const hashedPassword = await hash(user.password, 10)
    user.password = hashedPassword

    return await this.usersRepository.saveUser(user);
  }

  async deleteUser(id: number): Promise<number> {
    await this.usersRepository.deleteUser(id);
    return id
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.usersRepository.findUserById(id)
  }
}
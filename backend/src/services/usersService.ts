import { Injectable } from "@nestjs/common";
import { GetUserDto } from "src/models/dto/GetUserDto";
import { UsersRepository } from "src/repositories/UsersRepository";
import { hash } from 'bcryptjs';
import { User } from "src/models/User";
import { StudentRegistrationDto } from "src/models/dto/StudentRegistrationDto";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async getAllUsers(): Promise<GetUserDto[]> {
    return await this.usersRepository.getAllUsers()
  }

  async registerStudent(student: StudentRegistrationDto): Promise<GetUserDto> {
    student.password = await hash(student.password, 10)
    return await this.usersRepository.registerStudent(student);
  }

  async deleteUser(id: number): Promise<number> {
    await this.usersRepository.deleteUser(id);
    return id
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.usersRepository.findUserById(id)
  }
}
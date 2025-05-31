import { Injectable } from "@nestjs/common";
import { UsersRepository } from "src/repositories/usersRepository";
import { hash } from 'bcryptjs';
import { User } from "src/models/User";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async getAllUsers(): Promise<any[]> {
    return await this.usersRepository.getAllUsers()
  }

  async registerStudent(student): Promise<any> {
    student.password = await hash(student.password, 10)
    return await this.usersRepository.registerStudent(student) as User;
  }

  async registerMember(member): Promise<any> {
    member.password = await hash(member.password, 10)
    return await this.usersRepository.registerMember(member)
  }

  async deleteUser(id: number): Promise<number> {
    await this.usersRepository.deleteUser(id);
    return id
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.usersRepository.findUserById(id)
  }

  async searchForUserByEmail(partialEmail: string): Promise<any[]> {
    return await this.usersRepository.searchForUserByEmail(partialEmail)
  }
}

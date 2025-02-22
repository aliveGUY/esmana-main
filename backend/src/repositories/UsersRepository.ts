import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/models/dto/CreateUserDto';
import { LoginUserDto } from 'src/models/dto/LoginUserDto';
import { User } from 'src/models/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>
  ) { }

  async getAllUsers(): Promise<User[]> {
    return this.users.find()
  }

  async saveUser(user: CreateUserDto): Promise<User> {
    return this.users.save(user)
  }

  async deleteUser(id: number): Promise<void> {
    this.users.delete(id)
  }

  async getUser(user: LoginUserDto): Promise<User | null> {
    return this.users.findOne({
      where: { email: user.email, phone: user.phone },
      select: ["id", "phone", "firstName", "lastName", "middleName", "email", "password"]
    })
  }

  async findUserById(id: number): Promise<User | null> {
    return this.users.findOne({ where: { id } })
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async saveUser(user: User): Promise<User> {
    return this.users.save(user)
  }

  async deleteUser(id: number): Promise<void> {
    this.users.delete(id)
  }
}
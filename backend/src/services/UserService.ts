import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../repositories/UserRepository';
import { User } from 'src/models/User';

export interface IUserService {
  searchUsers(email: string): Promise<User[]>
  getAllUsers(): Promise<User[]>
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) { }

  async searchUsers(email: string): Promise<User[]> {
    return await this.userRepository.searchByEmail(email)
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers()
  }
}

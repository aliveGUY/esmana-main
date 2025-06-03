import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from '../models/User';
import { ERoles } from 'src/models/enums/ERoles';

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByGoogleId(googleId: string): Promise<User | null>;
  searchByEmail(email: string): Promise<User[]>
  getAllUsers(): Promise<User[]>
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(userData: Partial<User>): Promise<User> {
    const entity = this.userRepository.create({
      id: userData.id,
      firstName: userData.firstName,
      middleName: userData.middleName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      googleId: userData.googleId,
      profilePicture: userData.profilePicture,
      isEmailVerified: userData.isEmailVerified || false,
      roles: userData.roles || [ERoles.USER],
    });

    return await this.userRepository.save(entity);
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.firstName', 'user.middleName', 'user.lastName', 'user.roles', 'user.phone', 'user.email'])
      .where('user.id = :id', { id })
      .getOne();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.firstName', 'user.middleName', 'user.lastName', 'user.roles', 'user.phone', 'user.email', 'user.password'])
      .where('user.email = :email', { email })
      .getOne();
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.firstName', 'user.middleName', 'user.lastName', 'user.roles', 'user.phone', 'user.email'])
      .where('user.googleId = :googleId', { googleId })
      .getOne();
  }

  async searchByEmail(email: string): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.firstName', 'user.middleName', 'user.lastName', 'user.roles', 'user.email', 'user.phone',])
      .where('user.email LIKE :email', { email: `%${email}%` })
      .limit(10)
      .getMany();
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.firstName', 'user.middleName', 'user.lastName', 'user.roles', 'user.email', 'user.phone',])
      .getMany();
  }
}

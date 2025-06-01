import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/User';
import { ERoles } from 'src/models/enums/ERoles';

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByGoogleId(googleId: string): Promise<User | null>;
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

    const savedEntity = await this.userRepository.save(entity);
    return this.entityToModel(savedEntity);
  }

  async findById(id: number): Promise<User | null> {
    const entity = await this.userRepository.findOne({ where: { id } });
    return entity ? this.entityToModel(entity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.userRepository.findOne({ where: { email } });
    return entity ? this.entityToModel(entity) : null;
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    const entity = await this.userRepository.findOne({ where: { googleId } });
    return entity ? this.entityToModel(entity) : null;
  }

  private entityToModel(entity: User): User {
    const user = new User();
    user.id = entity.id;
    user.firstName = entity.firstName;
    user.middleName = entity.middleName;
    user.lastName = entity.lastName;
    user.email = entity.email;
    user.password = entity.password;
    user.googleId = entity.googleId;
    user.profilePicture = entity.profilePicture;
    user.isEmailVerified = entity.isEmailVerified;
    user.roles = entity.roles;
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByGoogleId(googleId: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  findAll(): Promise<User[]>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const entity = this.userRepository.create({
      id: user.id,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      googleId: user.googleId,
      profilePicture: user.profilePicture,
      provider: user.provider,
      isEmailVerified: user.isEmailVerified,
      roles: user.roles || ['user'],
    });

    const savedEntity = await this.userRepository.save(entity);
    return this.entityToModel(savedEntity);
  }

  async findById(id: string): Promise<User | null> {
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

  async update(id: string, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, {
      email: updateData.email,
      password: updateData.password,
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      googleId: updateData.googleId,
      profilePicture: updateData.profilePicture,
      provider: updateData.provider,
      isEmailVerified: updateData.isEmailVerified,
      roles: updateData.roles,
    });

    const updatedEntity = await this.userRepository.findOne({ where: { id } });
    if (!updatedEntity) {
      throw new Error(`User with ID ${id} not found`);
    }

    return this.entityToModel(updatedEntity);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.userRepository.count({ where: { id } });
    return count > 0;
  }

  async findAll(): Promise<User[]> {
    const entities = await this.userRepository.find();
    return entities.map(entity => this.entityToModel(entity));
  }

  private entityToModel(entity: UserEntity): User {
    return new User({
      id: entity.id,
      email: entity.email,
      password: entity.password,
      firstName: entity.firstName,
      lastName: entity.lastName,
      googleId: entity.googleId,
      profilePicture: entity.profilePicture,
      provider: entity.provider,
      isEmailVerified: entity.isEmailVerified,
      roles: entity.roles,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}

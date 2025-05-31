import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { User } from '../models/user.model';
import { AuthProvider } from '../models/enums';
import { IUserRepository } from '../repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

export interface CreateUserDto {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  googleId?: string;
  profilePicture?: string;
  provider: AuthProvider;
}

export interface IUserService {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByGoogleId(googleId: string): Promise<User | null>;
  updateUser(id: string, updateData: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  validatePassword(user: User, password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
  getAllUsers(): Promise<User[]>;
}

@Injectable()
export class UserService implements IUserService {
  private readonly saltRounds = 12;

  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash password if provided (for local users)
    let hashedPassword: string | undefined;
    if (createUserDto.password) {
      hashedPassword = await this.hashPassword(createUserDto.password);
    }

    const user = new User({
      id: uuidv4(),
      email: createUserDto.email,
      password: hashedPassword,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      googleId: createUserDto.googleId,
      profilePicture: createUserDto.profilePicture,
      provider: createUserDto.provider,
      isEmailVerified: createUserDto.provider === AuthProvider.GOOGLE, // Google users are pre-verified
      roles: ['user'], // Default role
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.userRepository.create(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.userRepository.findByGoogleId(googleId);
  }

  async updateUser(id: string, updateData: Partial<User>): Promise<User> {
    // If password is being updated, hash it
    if (updateData.password) {
      updateData.password = await this.hashPassword(updateData.password);
    }

    // Update the updatedAt timestamp
    updateData.updatedAt = new Date();

    return this.userRepository.update(id, updateData);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    if (!user.password) {
      return false; // User doesn't have a password (e.g., Google user)
    }

    return bcrypt.compare(password, user.password);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}

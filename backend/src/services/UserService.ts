import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../repositories/UserRepository';
import { User } from 'src/models/User';
import { UserRegistrationDto } from 'src/models/dto/UserRegistrationDto';
import { IGoogleClient } from 'src/infrastructure/GoogleClient';
import { CreateLectorDetailsDto } from 'src/models/dto/CreateLectorDetailsDto';
import { ILectorDetailsRepository } from 'src/repositories/LectorDetailsRepository';
import * as bcrypt from 'bcrypt';

export interface IUserService {
  searchUsers(email: string): Promise<User[]>
  getAllUsers(): Promise<User[]>
  createAccount(user: UserRegistrationDto, profilePicture?: Express.Multer.File): Promise<User>
  getUserById(userId: number): Promise<User>
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IGoogleClient') private readonly googleClient: IGoogleClient,
    @Inject('ILectorDetailsRepository') private readonly lectorDetailsRepository: ILectorDetailsRepository,

  ) { }

  async createAccount(userDto: UserRegistrationDto, profilePictureFile?: Express.Multer.File): Promise<User> {
    let profilePicture = ""
    if (profilePictureFile) {
      profilePicture = await this.googleClient.uploadMulterFileToDrive(profilePictureFile)
    }

    const hashedPassword = await this.hashPassword(userDto.password);

    const user: Partial<User> = {
      firstName: userDto.firstName,
      middleName: userDto.middleName,
      lastName: userDto.lastName,
      email: userDto.email,
      phone: userDto.phone,
      isEmailVerified: false,
      roles: userDto.roles,
      password: hashedPassword,
      profilePicture: profilePicture,
    }

    const newUser = await this.userRepository.create(user)

    if (userDto.lectorDetails) {
      const lectorDetails: CreateLectorDetailsDto = {
        userId: newUser.id,
        credentials: userDto.lectorDetails.credentials,
        biography: userDto.lectorDetails.biography,
      }

      await this.lectorDetailsRepository.createLectorDetails(lectorDetails)
    }

    return await this.userRepository.getById(newUser.id)
  }

  async getUserById(userId: number): Promise<User> {
    return await this.userRepository.getById(userId)
  }


  async searchUsers(email: string): Promise<User[]> {
    return await this.userRepository.searchByEmail(email)
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers()
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }
}

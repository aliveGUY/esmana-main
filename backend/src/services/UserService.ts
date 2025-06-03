import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../repositories/UserRepository';
import { User } from 'src/models/User';
import { UserRegistrationDto } from 'src/models/dto/UserRegistrationDto';
import { IGoogleClient } from 'src/infrastructure/GoogleClient';
import { CreateLectorDetailsDto } from 'src/models/dto/CreateLectorDetailsDto';
import { ILectorDetailsRepository } from 'src/repositories/LectorDetailsRepository';
import * as bcrypt from 'bcrypt';
import { EditUserDto } from 'src/models/dto/EditUserDto';

export interface IUserService {
  searchUsers(email: string): Promise<User[]>
  getAllUsers(): Promise<User[]>
  createAccount(user: UserRegistrationDto, profilePicture?: Express.Multer.File): Promise<User>
  editAccount(user: EditUserDto, profilePicture?: Express.Multer.File): Promise<User>
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

  async editAccount(userDto: EditUserDto, profilePictureFile?: Express.Multer.File): Promise<User> {
    const existingUser = await this.userRepository.getById(userDto.id);
    
    let profilePicture = existingUser.profilePicture;
    if (profilePictureFile) {
      if (existingUser.profilePicture) await this.googleClient.deleteFileIfExists(existingUser.profilePicture);
      profilePicture = await this.googleClient.uploadMulterFileToDrive(profilePictureFile);
    }
    
    if (userDto.lectorDetails && existingUser.lectorDetails) await this.lectorDetailsRepository.updateLectorDetails({...userDto.lectorDetails, id: existingUser.lectorDetails.id, userId: userDto.id});
    if (userDto.lectorDetails && !existingUser.lectorDetails) await this.lectorDetailsRepository.createLectorDetails({...userDto.lectorDetails, userId: userDto.id});
    if (!userDto.lectorDetails && existingUser.lectorDetails) await this.lectorDetailsRepository.deleteLectorDetails(existingUser.lectorDetails.id);
    
    const updateData: Partial<User> = {
      firstName: userDto.firstName,
      middleName: userDto.middleName,
      lastName: userDto.lastName,
      email: userDto.email,
      phone: userDto.phone,
      roles: userDto.roles,
      profilePicture: profilePicture
    };
    
    const mergedUser = this.userRepository.merge(existingUser, updateData);
    return await this.userRepository.update(mergedUser);
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

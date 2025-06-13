import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../repositories/UserRepository';
import { User } from 'src/models/User';
import { IGoogleClient } from 'src/infrastructure/GoogleClient';
import { ILectorDetailsRepository } from 'src/repositories/LectorDetailsRepository';
import { EditUserDto } from 'src/models/dto/EditUserDto';
import { Express } from 'express';

export interface IUserService {
  searchUsers(email: string): Promise<User[]>
  getAllUsers(): Promise<User[]>
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

  async editAccount(userDto: EditUserDto, profilePictureFile?: Express.Multer.File): Promise<User> {
    const existingUser = await this.userRepository.getById(userDto.id);

    let profilePicture = existingUser.profilePicture;
    if (profilePictureFile) {
      if (existingUser.profilePicture) await this.googleClient.deleteFileIfExists(existingUser.profilePicture);
      profilePicture = await this.googleClient.uploadMulterFileToDrive(profilePictureFile);
    }

    if (userDto.lectorDetails && existingUser.lectorDetails) await this.lectorDetailsRepository.updateLectorDetails({ ...userDto.lectorDetails, id: existingUser.lectorDetails.id, userId: existingUser.id });
    if (userDto.lectorDetails && !existingUser.lectorDetails) await this.lectorDetailsRepository.createLectorDetails({ ...userDto.lectorDetails, user: existingUser });
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
}

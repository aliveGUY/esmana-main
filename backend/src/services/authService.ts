import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "src/repositories/usersRepository";
import { compare } from 'bcryptjs';
import { isEmpty } from "lodash";
import { LoginUserDto } from "src/models/dto/LoginUserDto";
import { User } from "src/models/User";
import { GetUserDto } from "src/models/dto/GetUserDto";
import { CheckIfUserExistDto } from "src/models/dto/CheckIfUserExistDto";
import { ChangePasswordDto } from "src/models/dto/ChangePasswordDto";
import { hash } from 'bcryptjs';
import { RedisClient } from "src/clients/RedisClient";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly redisClient: RedisClient
  ) { }

  async validateUser(user: LoginUserDto): Promise<GetUserDto> {
    const validationResult = await this.usersRepository.getUser(user);

    if (isEmpty(validationResult)) {
      throw new UnauthorizedException()
    }

    const { password, ...foundUser } = validationResult

    if (!await compare(user.password, password)) {
      throw new UnauthorizedException()
    }

    return foundUser;
  }

  async saveSession(sessionId: string, userData: any): Promise<void> {
    await this.redisClient.saveSession(sessionId, userData);
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.redisClient.deleteSession(sessionId);
  }

  async changePassword(user: User, passwords: ChangePasswordDto): Promise<void> {
    const userDto: LoginUserDto = {
      phoneOrEmail: user.email,
      password: passwords.oldPassword
    }

    const validatedUser = await this.validateUser(userDto)

    if (isEmpty(validatedUser)) {
      throw new UnauthorizedException()
    }

    const hashedPassword: string = await hash(passwords.newPassword, 10)
    return await this.usersRepository.changePassword(validatedUser.id, hashedPassword)
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.usersRepository.findUserById(id)
  }

  async checkIfUserExist(user: CheckIfUserExistDto): Promise<boolean> {
    return await this.usersRepository.checkIfUserExists(user)
  }
}

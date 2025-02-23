import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "src/repositories/UsersRepository";
import { compare } from 'bcryptjs';
import { isEmpty } from "lodash";
import { LoginUserDto } from "src/models/dto/LoginUserDto";
import { User } from "src/models/User";
import { GetUserDto } from "src/models/dto/GetUserDto";
import { CheckIfUserExistDto } from "src/models/dto/CheckIfUserExistDto";

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) { }

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

  async findUserById(id: number): Promise<User | null> {
    return await this.usersRepository.findUserById(id)
  }

  async checkIfUserExist(user: CheckIfUserExistDto): Promise<boolean> {
    return await this.usersRepository.checkIfUserExists(user)
  }
}
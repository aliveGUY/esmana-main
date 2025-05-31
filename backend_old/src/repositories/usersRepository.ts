import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'lodash';
import { User } from 'src/models/User';
import { Like, Repository } from 'typeorm';


@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>
  ) { }

  async getAllUsers(): Promise<any[]> {
    return this.users.find()
  }

  async deleteUser(id: number): Promise<void> {
    await this.users.delete(id)
  }

  async getUser(user): Promise<User | null> {
    return this.users
      .createQueryBuilder("user")
      .where("user.email = :phoneOrEmail OR user.phone = :phoneOrEmail", {
        phoneOrEmail: user.phoneOrEmail,
      })
      .select(["user.id", "user.phone", "user.firstName", "user.lastName", "user.middleName", "user.email", "user.password", "user.role"])
      .getOne();
  }

  async findUserById(id: number): Promise<User | null> {
    return this.users.findOne({ where: { id } })
  }

  async checkIfUserExists(user): Promise<boolean> {
    const matchingUser = await this.users
      .createQueryBuilder("user")
      .where("user.email = :email OR user.phone = :phone", {
        email: user.email,
        phone: user.phone
      })
      .getOne();

    return !isEmpty(matchingUser)
  }

  async searchForUserByEmail(partialEmail: string): Promise<any[]> {
    return await this.users.find({
      select: ['email', 'id'],
      where: {
        email: Like(`${partialEmail}%`)
      }
    })
  }

  async changePassword(userId: number, hashedPassword: string): Promise<void> {
    await this.users.update(userId, { password: hashedPassword });

  }

  async registerMember(dto): Promise<any> {
    const newUser = {
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName
    }

    const createdUser: User = await this.users.save(newUser)
    return this.users.findOneOrFail({ where: { id: createdUser.id } });
  }

  async registerStudent(dto): Promise<any> {
    const newUser = {
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName
    }

    const createdUser: User = await this.users.save(newUser)
    return this.users.findOneOrFail({ where: { id: createdUser.id } });
  }
}

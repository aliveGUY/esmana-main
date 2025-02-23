import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'lodash';
import { CheckIfUserExistDto } from 'src/models/dto/CheckIfUserExistDto';
import { GetUserDto } from 'src/models/dto/GetUserDto';
import { LoginUserDto } from 'src/models/dto/LoginUserDto';
import { StudentRegistrationDto } from 'src/models/dto/StudentRegistrationDto';
import { Identity } from 'src/models/Identity';
import { User } from 'src/models/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>
  ) { }

  async registerStudent(dto: StudentRegistrationDto): Promise<GetUserDto> {
    const existingUser = await this.users.findOne({
      where: [{ email: dto.email }, { phone: dto.phone }],
      relations: ["identity"],
    });

    if (existingUser) {
      throw new Error("User with this email or phone already exists");
    }

    let existingIdentity: Identity | null = null;

    existingIdentity = await this.users.manager.findOne(Identity, {
      where: { workplace: dto.workplace, birthDate: dto.birthDate },
    });

    if (!existingIdentity) {
      existingIdentity = this.users.manager.create(Identity, {
        city: dto.city,
        birthDate: dto.birthDate,
        workplace: dto.workplace,
        position: dto.position,
        education: dto.education,
        fieldOfWork: dto.fieldOfWork,
        diplomaNumber: dto.diplomaNumber,
        personalDataCollectionConsent: dto.personalDataCollectionConsent,
      });

      existingIdentity = await this.users.manager.save(Identity, existingIdentity);
    }

    const newUser = this.users.create({
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName,
      identity: existingIdentity,
    });

    const savedUser = await this.users.save(newUser);

    return {
      id: savedUser.id,
      email: savedUser.email,
      phone: savedUser.phone,
      firstName: savedUser.firstName,
      middleName: savedUser.middleName,
      lastName: savedUser.lastName,
    };
  }



  async getAllUsers(): Promise<User[]> {
    return this.users.find()
  }

  async deleteUser(id: number): Promise<void> {
    this.users.delete(id)
  }

  async getUser(user: LoginUserDto): Promise<User | null> {
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

  async checkIfUserExists(user: CheckIfUserExistDto): Promise<boolean> {
    const matchingUser = await this.users
      .createQueryBuilder("user")
      .where("user.email = :email OR user.phone = :phone", {
        email: user.email,
        phone: user.phone
      })
      .getOne();

    console.log({ matchingUser })

    return !isEmpty(matchingUser)
  }
}
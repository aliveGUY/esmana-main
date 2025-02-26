import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'lodash';
import { CheckIfUserExistDto } from 'src/models/dto/CheckIfUserExistDto';
import { CreateMemberIdentityDto } from 'src/models/dto/CreateMemberIdentityDto';
import { CreateStudentIdentityDto } from 'src/models/dto/CreateStudentIdentityDto';
import { CreateUserDto } from 'src/models/dto/CreateUserDto';
import { GetUserDto } from 'src/models/dto/GetUserDto';
import { LoginUserDto } from 'src/models/dto/LoginUserDto';
import { MemberRegistrationDto } from 'src/models/dto/MemberRegistrationDto';
import { StudentRegistrationDto } from 'src/models/dto/StudentRegistrationDto';
import { Identity } from 'src/models/Identity';
import { User } from 'src/models/User';
import { Like, Repository } from 'typeorm';
import { IdentityRepository } from './identityRepository';


@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly identityRepository: IdentityRepository,
  ) { }

  async getAllUsers(): Promise<GetUserDto[]> {
    return this.users.find()
  }

  async deleteUser(id: number): Promise<void> {
    await this.users.delete(id)
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

    return !isEmpty(matchingUser)
  }

  async searchForUserByEmail(partialEmail: string): Promise<GetUserDto[]> {
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

  async registerMember(dto: MemberRegistrationDto): Promise<GetUserDto> {
    const newUser: CreateUserDto = {
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName
    }

    const createdUser: User = await this.users.save(newUser)

    const newIdentity: CreateMemberIdentityDto = {
      city: dto.city,
      birthDate: dto.birthDate,
      workplace: dto.workplace,
      position: dto.position,
      education: dto.education,
      fieldOfWork: dto.fieldOfWork,
      diplomaNumber: dto.diplomaNumber,
      personalDataCollectionConsent: dto.personalDataCollectionConsent,
      residenceAddress: dto.residenceAddress,
      country: dto.country,
      region: dto.region,
      taxpayerId: dto.taxpayerId,
      passportId: dto.passportId,
      passportIssuedBy: dto.passportIssuedBy,
      educationInstitution: dto.educationInstitution,
      workExperience: dto.workExperience,
      relevantTopics: dto.relevantTopics,
      user: createdUser
    }

    const createdIdentity: Identity = await this.identityRepository.createMemberIdentity(newIdentity)

    await this.users.update(createdUser.id, { identity: createdIdentity })

    return this.users.findOneOrFail({ where: { id: createdUser.id } });
  }

  async registerStudent(dto: StudentRegistrationDto): Promise<GetUserDto> {
    const newUser: CreateUserDto = {
      email: dto.email,
      phone: dto.phone,
      password: dto.password,
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName
    }

    const createdUser: User = await this.users.save(newUser)

    const newIdentity: CreateStudentIdentityDto = {
      city: dto.city,
      birthDate: dto.birthDate,
      workplace: dto.workplace,
      position: dto.position,
      education: dto.education,
      fieldOfWork: dto.fieldOfWork,
      diplomaNumber: dto.diplomaNumber,
      personalDataCollectionConsent: dto.personalDataCollectionConsent,
      user: createdUser
    }

    const createdIdentity: Identity = await this.identityRepository.createStudentIdentity(newIdentity)

    await this.users.update(createdUser.id, { identity: createdIdentity })

    return this.users.findOneOrFail({ where: { id: createdUser.id } });
  }
}
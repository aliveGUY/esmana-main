import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'lodash';
import { CheckIfUserExistDto } from 'src/models/dto/CheckIfUserExistDto';
import { GetUserDto } from 'src/models/dto/GetUserDto';
import { LoginUserDto } from 'src/models/dto/LoginUserDto';
import { MemberRegistrationDto } from 'src/models/dto/MemberRegistrationDto';
import { StudentRegistrationDto } from 'src/models/dto/StudentRegistrationDto';
import { StudentToMemberDto } from 'src/models/dto/StudentToMemberDto';
import { Identity } from 'src/models/Identity';
import { User } from 'src/models/User';
import { Repository } from 'typeorm';
import { DataSource } from "typeorm";


@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly dataSource: DataSource
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





  async registerMember(dto: MemberRegistrationDto): Promise<GetUserDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingUser = await queryRunner.manager.findOne(User, {
        where: [{ email: dto.email }, { phone: dto.phone }],
        relations: ["identity"],
      });

      if (existingUser) {
        throw new Error("User with this email or phone already exists");
      }

      let existingIdentity = await queryRunner.manager.findOne(Identity, {
        where: { workplace: dto.workplace, birthDate: dto.birthDate },
      });

      if (!existingIdentity) {
        existingIdentity = queryRunner.manager.create(Identity, {
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
        });

        existingIdentity = await queryRunner.manager.save(Identity, existingIdentity);
      }

      const newUser = queryRunner.manager.create(User, {
        email: dto.email,
        phone: dto.phone,
        password: dto.password,
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        identity: existingIdentity,
      });

      existingIdentity.user = newUser;
      await queryRunner.manager.save(Identity, existingIdentity);

      const savedUser = await queryRunner.manager.save(User, newUser);

      await queryRunner.commitTransaction();

      return {
        id: savedUser.id,
        email: savedUser.email,
        phone: savedUser.phone,
        firstName: savedUser.firstName,
        middleName: savedUser.middleName,
        lastName: savedUser.lastName,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }


  async registerStudent(dto: StudentRegistrationDto): Promise<GetUserDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingUser = await queryRunner.manager.findOne(User, {
        where: [{ email: dto.email }, { phone: dto.phone }],
        relations: ["identity"],
      });

      if (existingUser) {
        throw new Error("User with this email or phone already exists");
      }

      let existingIdentity = await queryRunner.manager.findOne(Identity, {
        where: { workplace: dto.workplace, birthDate: dto.birthDate },
      });

      if (!existingIdentity) {
        existingIdentity = queryRunner.manager.create(Identity, {
          city: dto.city,
          birthDate: dto.birthDate,
          workplace: dto.workplace,
          position: dto.position,
          education: dto.education,
          fieldOfWork: dto.fieldOfWork,
          diplomaNumber: dto.diplomaNumber,
          personalDataCollectionConsent: dto.personalDataCollectionConsent,
        });

        existingIdentity = await queryRunner.manager.save(Identity, existingIdentity);
      }

      const newUser = queryRunner.manager.create(User, {
        email: dto.email,
        phone: dto.phone,
        password: dto.password,
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
      });

      const savedUser = await queryRunner.manager.save(User, newUser);

      existingIdentity.user = savedUser;
      await queryRunner.manager.save(Identity, existingIdentity);

      await queryRunner.commitTransaction();

      return {
        id: savedUser.id,
        email: savedUser.email,
        phone: savedUser.phone,
        firstName: savedUser.firstName,
        middleName: savedUser.middleName,
        lastName: savedUser.lastName,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

}
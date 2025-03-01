import { Injectable } from "@nestjs/common";
import { GetUserDto } from "src/models/dto/GetUserDto";
import { UsersRepository } from "src/repositories/usersRepository";
import { hash } from 'bcryptjs';
import { User } from "src/models/User";
import { StudentRegistrationDto } from "src/models/dto/StudentRegistrationDto";
import { MemberRegistrationDto } from "src/models/dto/MemberRegistrationDto";
import { NotificationService } from "./notificationService";
import { isEmpty } from "lodash";
import { CourseRepository } from "src/repositories/courseRepository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository,
    private readonly notificationService: NotificationService,
    private readonly courseRepository: CourseRepository) { }

  async getAllUsers(): Promise<GetUserDto[]> {
    return await this.usersRepository.getAllUsers()
  }

  async registerStudent(student: StudentRegistrationDto): Promise<GetUserDto> {
    student.password = await hash(student.password, 10)
    const newStudent: User = await this.usersRepository.registerStudent(student) as User;

    if (!isEmpty(student.course)) {
      await this.courseRepository.addStudentsToCourse(student.course.id, [newStudent.id])
      await this.notificationService.createCoursePurchaseNotification(newStudent, student.course)
    }

    return newStudent
  }

  async registerMember(member: MemberRegistrationDto): Promise<GetUserDto> {
    member.password = await hash(member.password, 10)
    return await this.usersRepository.registerMember(member)
  }

  async deleteUser(id: number): Promise<number> {
    await this.usersRepository.deleteUser(id);
    return id
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.usersRepository.findUserById(id)
  }

  async searchForUserByEmail(partialEmail: string): Promise<GetUserDto[]> {
    return await this.usersRepository.searchForUserByEmail(partialEmail)
  }
}
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserLecture } from "src/models/UserLecture";
import { Repository } from "typeorm";

export interface IUserLectureRepository {
  createUserLecture(userLecture: Partial<UserLecture>): Promise<UserLecture>
  updateUserLecture(userLecture: Partial<UserLecture>): Promise<UserLecture>
  deleteUserLecture(userId: number, lectureId: number): Promise<void>
  getUserLecturesByLectureId(lectureId: number): Promise<UserLecture[]>
}

@Injectable()
export class UserLectureRepository implements IUserLectureRepository {
  constructor(
    @InjectRepository(UserLecture)
    private readonly userLectureRepository: Repository<UserLecture>,
  ) { }

  async createUserLecture(userLecture: Partial<UserLecture>): Promise<UserLecture> {
    return await this.userLectureRepository.save(userLecture);
  }

  async updateUserLecture(userLecture: Partial<UserLecture>): Promise<UserLecture> {
    return await this.userLectureRepository.save(userLecture);
  }

  async deleteUserLecture(userId: number, lectureId: number): Promise<void> {
    await this.userLectureRepository.delete({ userId, lectureId });
  }

  async getUserLecturesByLectureId(lectureId: number): Promise<UserLecture[]> {
    return await this.userLectureRepository.find({
      where: { lectureId },
      relations: ['user']
    });
  }
}

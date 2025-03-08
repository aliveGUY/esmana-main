import { Injectable } from "@nestjs/common";
import { Course } from "src/models/Course";
import { CreateLectureDto } from "src/models/dto/CreateLectureDto";
import { LectureRepository } from "src/repositories/lectureRepository";

@Injectable()
export class LectureService {
  constructor(private readonly lectureRepository: LectureRepository) { }

  async createLecture(lecture: CreateLectureDto): Promise<Course> {
    return await this.lectureRepository.createLecture(lecture)
  }
}
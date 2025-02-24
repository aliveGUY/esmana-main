import { Injectable } from "@nestjs/common";
import { CreateLectureDto } from "src/models/dto/CreateLectureDto";
import { Lecture } from "src/models/Lecture";
import { LectureRepository } from "src/repositories/lectureRepository";

@Injectable()
export class LectureService {
  constructor(private readonly lectureRepository: LectureRepository) { }

  async createLecture(lecture: CreateLectureDto): Promise<Lecture> {
    return await this.lectureRepository.createLecture(lecture)
  }
}
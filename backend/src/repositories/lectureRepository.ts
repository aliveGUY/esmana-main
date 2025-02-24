import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateLectureDto } from "src/models/dto/CreateLectureDto";
import { Lecture } from "src/models/Lecture";
import { Repository } from "typeorm";

@Injectable()
export class LectureRepository {
  constructor(
    @InjectRepository(Lecture) private readonly lecture: Repository<Lecture>,
  ) { }

  async createLecture(lecture: CreateLectureDto): Promise<Lecture> {
    const newLecture: Lecture = await this.lecture.save(lecture)
    return this.lecture.findOneOrFail({ where: { id: newLecture.id }, relations: ['speakers', 'course'] })
  }
}
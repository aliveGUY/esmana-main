import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateLectureDto } from "src/models/dto/CreateLectureDto";
import { Lecture } from "src/models/Lecture";
import { Repository } from "typeorm";
import { CourseRepository } from "./courseRepository";
import { Course } from "src/models/Course";

@Injectable()
export class LectureRepository {
  constructor(
    @InjectRepository(Lecture) private readonly lecture: Repository<Lecture>,
    private readonly courseRepository: CourseRepository
  ) { }

  async createLecture(lecture: CreateLectureDto): Promise<Course> {
    await this.lecture.save(lecture)
    return await this.recalculateCourseDates(lecture.course.id)
  }

  private async recalculateCourseDates(courseId: number): Promise<Course> {
    const { earliestStart, latestEnd } = await this.lecture
      .createQueryBuilder('lecture')
      .select('MIN(lecture.start_time)', 'earliestStart')
      .addSelect('MAX(lecture.end_time)', 'latestEnd')
      .where('lecture.course_id = :courseId', { courseId })
      .getRawOne();

    return this.courseRepository.updateCourseDates(courseId, earliestStart, latestEnd)
  }
}
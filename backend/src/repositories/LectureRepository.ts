import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EditLectureDto } from "src/models/dto/EditLectureDto";
import { Lecture } from "src/models/Lecture";
import { Repository } from "typeorm";

export interface ILectureRepository {
  createLecture(lecture: Partial<Lecture>): Promise<Lecture>
  editLecture(lecture: Partial<Lecture>): Promise<Lecture>
  getLectureById(id: number): Promise<Lecture>
  deleteLecture(id: number): Promise<void>
}

@Injectable()
export class LectureRepository implements ILectureRepository {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
  ) { }

  async createLecture(lecture: Partial<Lecture>): Promise<Lecture> {
    return await this.lectureRepository.save(lecture)
  }

  async editLecture(lecture: Partial<Lecture>): Promise<Lecture> {
    const savedLecture = await this.lectureRepository.save(lecture);
    return await this.getLectureById(savedLecture.id);
  }

  async getLectureById(id: number): Promise<Lecture> {
    const lecture = await this.lectureRepository.findOne({
      where: { id },
      relations: ['materials', 'materials.evaluation']
    });

    if (!lecture) {
      throw new Error(`Lecture with id ${id} not found`);
    }

    return lecture;
  }

  async deleteLecture(id: number): Promise<void> {
    await this.lectureRepository.delete({ id })
  }
}

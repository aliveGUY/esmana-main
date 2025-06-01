import { Inject, Injectable } from "@nestjs/common"
import { CreateLectureDto } from "src/models/dto/CreateLectureDto"
import { EditLectureDto } from "src/models/dto/EditLectureDto"
import { Lecture } from "src/models/Lecture"
import { LectureMaterials } from "src/models/LectureMaterials"
import { IEvaluationQuestionRepository } from "src/repositories/EvaluationQuestionRepository"
import { ILectureMaterialsRepository } from "src/repositories/LectureMaterialsRepository"
import { ILectureRepository } from "src/repositories/LectureRepository"

export interface ILectureService {
  createLecture(lecture: CreateLectureDto): Promise<Lecture>
  editLecture(lecture: EditLectureDto): Promise<Lecture>
  deleteLecture(id: number): Promise<void>
}

@Injectable()
export class LectureService implements ILectureService {
  constructor(
    @Inject('ILectureRepository') private readonly lectureRepository: ILectureRepository,
    @Inject('ILectureMaterialsRepository') private readonly lectureMaterialsRepository: ILectureMaterialsRepository,
    @Inject('IEvaluationQuestionRepository') private readonly evaluationQuestionRepository: IEvaluationQuestionRepository,
  ) { }

  async createLecture(lectureDto: CreateLectureDto): Promise<Lecture> {
    const evaluation = await Promise.all(
      lectureDto.materials.evaluation.map(evaluation => this.evaluationQuestionRepository.createEvaluationQuestion(evaluation))
    )

    const lectureMaterialsDto: Partial<LectureMaterials> = {
      videoUrl: lectureDto.materials.videoUrl,
      meetingUrl: 'lectureDto.materials.meetingUrl',
      richText: lectureDto.materials.richText,
      evaluation: evaluation,
    }

    const lectureMaterials = await this.lectureMaterialsRepository.createLectureMaterials(lectureMaterialsDto)

    const lecture: Partial<Lecture> = {
      title: lectureDto.title,
      description: lectureDto.description,
      price: lectureDto.price,
      startTime: lectureDto.startTime,
      endTime: lectureDto.endTime,
      materials: lectureMaterials,
      users: lectureDto.users,
    }

    return await this.lectureRepository.createLecture(lecture)
  }

  async editLecture(lecture: EditLectureDto): Promise<Lecture> {
    return await this.lectureRepository.editLecture(lecture)
  }

  async deleteLecture(id: number): Promise<void> {
    return await this.lectureRepository.deleteLecture(id)
  }
}
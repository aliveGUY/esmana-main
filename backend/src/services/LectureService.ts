import { Inject, Injectable } from "@nestjs/common"
import { isEmpty } from "class-validator"
import { IGoogleClient } from "src/infrastructure/GoogleClient"
import { EditLectureDto } from "src/models/dto/EditLectureDto"
import { Lecture } from "src/models/Lecture"
import { LectureMaterials } from "src/models/LectureMaterials"
import { UserLecture } from "src/models/UserLecture"
import { ILectureMaterialsRepository } from "src/repositories/LectureMaterialsRepository"
import { ILectureRepository } from "src/repositories/LectureRepository"
import { IUserLectureRepository } from "src/repositories/UserLectureRepository"
import { IEvaluationQuestionService } from "./EvaluationQuestionService"

export interface ILectureService {
  createLecture(lecture: Partial<Lecture>): Promise<Lecture>
  editLecture(lecture: EditLectureDto): Promise<Lecture>
  deleteLecture(id: number): Promise<void>
}

@Injectable()
export class LectureService implements ILectureService {
  constructor(
    @Inject('ILectureRepository') private readonly lectureRepository: ILectureRepository,
    @Inject('ILectureMaterialsRepository') private readonly lectureMaterialsRepository: ILectureMaterialsRepository,
    @Inject('IEvaluationQuestionService') private readonly evaluationQuestionService: IEvaluationQuestionService,
    @Inject('IUserLectureRepository') private readonly userLectureRepository: IUserLectureRepository,
    @Inject('IGoogleClient') private readonly googleClient: IGoogleClient
  ) { }

  async createLecture(lectureDto: Partial<Lecture>): Promise<Lecture> {
    const lecture: Partial<Lecture> = {
      title: lectureDto.title,
      description: lectureDto.description,
      price: lectureDto.price,
      startTime: lectureDto.startTime,
      endTime: lectureDto.endTime,
      users: lectureDto.users,
      course: lectureDto.course,
    }

    const newLecture = await this.lectureRepository.createLecture(lecture)

    if (lectureDto.users && !isEmpty(lectureDto.users)) {
      const promises = lectureDto.users.map(userLectureDto => {
        const userLecture: Partial<UserLecture> = {
          user: userLectureDto.user,
          lecture: newLecture,
          isCompleted: userLectureDto.isCompleted,
          isLector: userLectureDto.isLector,
          isGotAcademicHours: userLectureDto.isGotAcademicHours,
        }

        return this.userLectureRepository.createUserLecture(userLecture)
      })

      await Promise.all(promises)
    }

    let newMaterials: LectureMaterials | null = null
    if (lectureDto.materials && !isEmpty(lectureDto.materials)) {
      const meetingUrl = await this.googleClient.createMeetingLink(newLecture.title, newLecture.startTime, newLecture.endTime)

      const lectureMaterials: Partial<LectureMaterials> = {
        videoUrl: lectureDto.materials.videoUrl,
        meetingUrl: meetingUrl,
        richText: lectureDto.materials.richText,
        lecture: newLecture
      }

      newMaterials = await this.lectureMaterialsRepository.createLectureMaterials(lectureMaterials)
    }

    const materialsEvaluationDto = lectureDto.materials?.evaluation
    if (newMaterials && materialsEvaluationDto && !isEmpty(materialsEvaluationDto)) {
      await this.evaluationQuestionService.saveEvaluationQuestionsForLecture(newMaterials, materialsEvaluationDto)
    }

    return await this.lectureRepository.getLectureById(newLecture.id)
  }

  async editLecture(lectureDto: EditLectureDto): Promise<Lecture> {
    const oldLecture = await this.lectureRepository.getLectureById(lectureDto.id)
    const meetingUrl = await this.googleClient.createMeetingLink(lectureDto.title, lectureDto.startTime, lectureDto.endTime)

    const lecture: Partial<Lecture> = {
      id: lectureDto.id,
      title: lectureDto.title,
      description: lectureDto.description,
      price: lectureDto.price,
      startTime: lectureDto.startTime,
      endTime: lectureDto.endTime,
      course: oldLecture.course,
    }

    const updatedLecture = await this.lectureRepository.editLecture(lecture)

    if (lectureDto.users && !isEmpty(lectureDto.users)) {
      const promises = lectureDto.users.map(userLectureDto => {
        const userLecture: Partial<UserLecture> = {
          user: userLectureDto.user,
          lecture: updatedLecture,
          isCompleted: userLectureDto.isCompleted,
          isLector: userLectureDto.isLector,
          isGotAcademicHours: userLectureDto.isGotAcademicHours,
        }

        return this.userLectureRepository.createUserLecture(userLecture)
      })

      await Promise.all(promises)
    }

    let updatedMaterials: LectureMaterials | null = null
    if ((!oldLecture.materials || isEmpty(oldLecture.materials)) && lectureDto.materials && !isEmpty(lectureDto.materials)) {

      const lectureMaterials: Partial<LectureMaterials> = {
        videoUrl: lectureDto.materials.videoUrl,
        meetingUrl: meetingUrl,
        richText: lectureDto.materials.richText,
        lecture: updatedLecture
      }

      updatedMaterials = await this.lectureMaterialsRepository.createLectureMaterials(lectureMaterials)
    }


    if ((oldLecture.materials || !isEmpty(oldLecture.materials)) && lectureDto.materials && !isEmpty(lectureDto.materials)) {
      const lectureMaterials: Partial<LectureMaterials> = {
        id: lectureDto.materials.id,
        videoUrl: lectureDto.materials.videoUrl,
        meetingUrl: meetingUrl,
        richText: lectureDto.materials.richText,
        lecture: updatedLecture
      }

      updatedMaterials = await this.lectureMaterialsRepository.editLectureMaterials(lectureMaterials)
    }

    const materialsEvaluationDto = lectureDto.materials?.evaluation
    const oldMaterialsEvaluation = oldLecture.materials?.evaluation
    if (updatedMaterials && materialsEvaluationDto && !isEmpty(materialsEvaluationDto)) {
      await this.evaluationQuestionService.saveEvaluationQuestionsForLecture(updatedMaterials, materialsEvaluationDto, oldMaterialsEvaluation)
    }

    return await this.lectureRepository.getLectureById(updatedLecture.id)
  }

  async deleteLecture(id: number): Promise<void> {
    return await this.lectureRepository.deleteLecture(id)
  }
}

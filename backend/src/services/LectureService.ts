import { Inject, Injectable } from "@nestjs/common"
import { IGoogleClient } from "src/infrastructure/GoogleClient"
import { CreateLectureDto } from "src/models/dto/CreateLectureDto"
import { CreateUserLectureDto } from "src/models/dto/CreateUserLectureDto"
import { EditLectureDto } from "src/models/dto/EditLectureDto"
import { Lecture } from "src/models/Lecture"
import { LectureMaterials } from "src/models/LectureMaterials"
import { UserLecture } from "src/models/UserLecture"
import { IEvaluationQuestionRepository } from "src/repositories/EvaluationQuestionRepository"
import { ILectureMaterialsRepository } from "src/repositories/LectureMaterialsRepository"
import { ILectureRepository } from "src/repositories/LectureRepository"
import { IUserLectureRepository } from "src/repositories/UserLectureRepository"

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
    @Inject('IUserLectureRepository') private readonly userLectureRepository: IUserLectureRepository,
    @Inject('IGoogleClient') private readonly googleClient: IGoogleClient
  ) { }

  async createLecture(lectureDto: CreateLectureDto): Promise<Lecture> {
    const lecture = await this.createLectureWithoutUsers(lectureDto);
    
    if (lectureDto.users?.length > 0) {
      const userLectures = await this.createUserLecturesForLecture(lecture.id, lectureDto.users);
      lecture.users = userLectures;
    }
    
    return lecture;
  }

  private async createLectureWithoutUsers(lectureDto: CreateLectureDto): Promise<Lecture> {
    const meetingUrl = await this.googleClient.createMeetingLink(lectureDto.title, lectureDto.startTime, lectureDto.endTime)

    const evaluation = await Promise.all(
      lectureDto.materials.evaluation.map(evaluation => this.evaluationQuestionRepository.createEvaluationQuestion(evaluation))
    )

    const lectureMaterialsDto: Partial<LectureMaterials> = {
      videoUrl: lectureDto.materials.videoUrl,
      meetingUrl: meetingUrl,
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
    }

    return await this.lectureRepository.createLecture(lecture)
  }

  private async createUserLecturesForLecture(lectureId: number, users: CreateUserLectureDto[]): Promise<UserLecture[]> {
    return await Promise.all(
      users.map(user => this.userLectureRepository.createUserLectureWithLectureId(lectureId, user))
    )
  }

  async editLecture(lectureDto: any): Promise<Lecture> {
    // Handle evaluation questions with smart merge
    if (lectureDto.materials?.evaluation && lectureDto.materials.evaluation.length > 0) {
      await Promise.all(
        lectureDto.materials.evaluation.map(evaluation => {
          if (evaluation.id) {
            return this.evaluationQuestionRepository.editEvaluationQuestion(evaluation);
          }
          return this.evaluationQuestionRepository.createEvaluationQuestion(evaluation);
        })
      );
    }

    // Handle users if provided
    if (lectureDto.users) {
      await this.handleLectureUsers(lectureDto.id, lectureDto.users);
    }

    // Handle lecture materials if provided
    if (lectureDto.materials) {
      await this.lectureMaterialsRepository.editLectureMaterials(lectureDto.materials);
    }

    return await this.lectureRepository.editLecture(lectureDto)
  }

  private async handleLectureUsers(lectureId: number, users: any[]): Promise<void> {
    if (!users || users.length === 0) return;

    const existingUsers = await this.userLectureRepository.getUserLecturesByLectureId(lectureId);
    const existingUserIds = existingUsers.map(u => u.userId);
    const incomingUserIds = users.map(u => u.userId);

    const usersToRemove = existingUsers.filter(u => !incomingUserIds.includes(u.userId));
    if (usersToRemove.length > 0) {
      await Promise.all(
        usersToRemove.map(u => this.userLectureRepository.deleteUserLecture(u.userId, lectureId))
      );
    }

    await Promise.all(
      users.map(async (user) => {
        const userLectureData = {
          userId: user.userId,
          lectureId: lectureId,
          isCompleted: user.isCompleted || false,
          isLector: user.isLector || false,
          isGotAcademicHours: user.isGotAcademicHours || false
        };

        if (existingUserIds.includes(user.userId)) {
          return await this.userLectureRepository.updateUserLecture(userLectureData);
        }
        return await this.userLectureRepository.createUserLecture(userLectureData);
      })
    );
  }

  async deleteLecture(id: number): Promise<void> {
    return await this.lectureRepository.deleteLecture(id)
  }
}

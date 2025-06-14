import { Inject, Injectable } from "@nestjs/common";
import { LectureEvaluationDto } from "src/models/dto/LectureEvaluationDto";
import { ILectureRepository } from "src/repositories/LectureRepository";
import { IUserLectureRepository } from "src/repositories/UserLectureRepository";
import { isEqual } from 'lodash'
import { EvaluationResultDto } from "src/models/dto/EvaluationResultDto";

export interface IEvaluationService {
  evaluateLectureCompletion(lectureCompletion: LectureEvaluationDto): Promise<EvaluationResultDto>
}

@Injectable()
export class EvaluationService implements IEvaluationService {
  constructor(
    @Inject('IUserLectureRepository') private readonly userLectureRepository: IUserLectureRepository,
    @Inject('ILectureRepository') private readonly lectureRepository: ILectureRepository,
  ) { }

  async evaluateLectureCompletion(lectureCompletion: LectureEvaluationDto): Promise<EvaluationResultDto> {
    const { lectureId, userId, answers } = lectureCompletion
    const lecture = await this.lectureRepository.getLectureById(lectureId)
    const evaluation = lecture.materials.evaluation

    const result: EvaluationResultDto = {
      lectureId: lectureId,
      userId: userId,
      isPassed: false
    }

    if (!evaluation) return result

    const isPassedArray = evaluation.map((question) => {
      const { correctAnswers, id } = question
      const _answers = answers.find(answer => answer.questionId === id)?.answers
      return isEqual(_answers, correctAnswers)
    })

    const isPassed = !isPassedArray.includes(false)

    if (isPassed) {
      await this.userLectureRepository.setIsCompletedByUserAndLecture(userId, lectureId, isPassed)
      result.isPassed = isPassed
    }

    return result
  }
}
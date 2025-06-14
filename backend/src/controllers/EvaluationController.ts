import { Body, Controller, Inject, Post } from "@nestjs/common";
import { LectureEvaluationDto } from "src/models/dto/LectureEvaluationDto";
import { IEvaluationService } from "src/services/EvaluationService";

@Controller('evaluation')
export class EvaluationController {
  constructor(
    @Inject('IEvaluationService') private readonly evaluationService: IEvaluationService,
  ) { }

  @Post('lecture')
  async evaluateLectureCompletion(@Body() lectureCompletion: LectureEvaluationDto) {
    return await this.evaluationService.evaluateLectureCompletion(lectureCompletion)
  }
}
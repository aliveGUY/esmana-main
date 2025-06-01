import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateEvaluationQuestionDto } from "src/models/dto/CreateEvaluationQuestionDto";
import { EditEvaluationQuestionDto } from "src/models/dto/EditEvaluationQuestionDto";
import { EvaluationQuestion } from "src/models/EvaluationQuestion";
import { Repository } from "typeorm";

export interface IEvaluationQuestionRepository {
  createEvaluationQuestion(question: CreateEvaluationQuestionDto): Promise<EvaluationQuestion>
  editEvaluationQuestion(question: EditEvaluationQuestionDto): Promise<EvaluationQuestion>
  deleteEvaluationQuestion(id: number): Promise<void>
}

@Injectable()
export class EvaluationQuestionRepository implements IEvaluationQuestionRepository {
  constructor(
    @InjectRepository(EvaluationQuestion)
    private readonly evaluationQuestionRepository: Repository<EvaluationQuestion>,
  ) { }

  async createEvaluationQuestion(question: CreateEvaluationQuestionDto): Promise<EvaluationQuestion> {
    return await this.evaluationQuestionRepository.save(question)
  }

  async editEvaluationQuestion(question: EditEvaluationQuestionDto): Promise<EvaluationQuestion> {
    return await this.evaluationQuestionRepository.save(question)
  }

  async deleteEvaluationQuestion(id: number): Promise<void> {
    await this.evaluationQuestionRepository.delete({ id })
  }
}
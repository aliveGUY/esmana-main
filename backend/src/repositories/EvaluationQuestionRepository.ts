import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EvaluationQuestion } from "src/models/EvaluationQuestion";
import { Repository } from "typeorm";

export interface IEvaluationQuestionRepository {
  createEvaluationQuestion(question: Partial<EvaluationQuestion>): Promise<EvaluationQuestion>
  editEvaluationQuestion(question: Partial<EvaluationQuestion>): Promise<EvaluationQuestion>
  deleteEvaluationQuestion(id: number): Promise<void>
}

@Injectable()
export class EvaluationQuestionRepository implements IEvaluationQuestionRepository {
  constructor(
    @InjectRepository(EvaluationQuestion)
    private readonly evaluationQuestionRepository: Repository<EvaluationQuestion>,
  ) { }

  async createEvaluationQuestion(question: Partial<EvaluationQuestion>): Promise<EvaluationQuestion> {
    return await this.evaluationQuestionRepository.save(question)
  }

  async editEvaluationQuestion(question: Partial<EvaluationQuestion>): Promise<EvaluationQuestion> {
    return await this.evaluationQuestionRepository.save(question)
  }

  async deleteEvaluationQuestion(id: number): Promise<void> {
    await this.evaluationQuestionRepository.delete({ id })
  }
}
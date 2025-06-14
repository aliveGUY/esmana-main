import { Inject, Injectable } from "@nestjs/common";
import { Course } from "src/models/Course";
import { EvaluationQuestion } from "src/models/EvaluationQuestion";
import { LectureMaterials } from "src/models/LectureMaterials";
import { IEvaluationQuestionRepository } from "src/repositories/EvaluationQuestionRepository";
import { isEmpty, filter, differenceWith, has } from "lodash";

export interface IEvaluationQuestionService {
  saveEvaluationQuestionsForLecture(lectureMaterials: LectureMaterials, newEvaluationQuestions: Partial<EvaluationQuestion>[], oldEvaluationQuestions?: Partial<EvaluationQuestion>[]): Promise<void>
  saveEvaluationQuestionsForCourse(course: Course, newEvaluationQuestions: Partial<EvaluationQuestion>[], oldEvaluationQuestions?: Partial<EvaluationQuestion>[]): Promise<void>
}

@Injectable()
export class EvaluationQuestionService implements IEvaluationQuestionService {
  constructor(
    @Inject('IEvaluationQuestionRepository') private readonly evaluationQuestionRepository: IEvaluationQuestionRepository,
  ) { }

  async saveEvaluationQuestionsForLecture(lectureMaterials: LectureMaterials, newEvaluationQuestions: Partial<EvaluationQuestion>[], oldEvaluationQuestions?: Partial<EvaluationQuestion>[]) {
    if (!oldEvaluationQuestions || isEmpty(oldEvaluationQuestions)) {
      const promises = newEvaluationQuestions.map(questionDto => {
        const question: Partial<EvaluationQuestion> = {
          questionText: questionDto.questionText,
          correctAnswers: questionDto.correctAnswers,
          options: questionDto.options,
          lectureMaterials: lectureMaterials
        }

        return this.evaluationQuestionRepository.createEvaluationQuestion(question)
      })

      await Promise.all(promises)
    }

    if (oldEvaluationQuestions && !isEmpty(oldEvaluationQuestions)) {
      const questionsToCreate: Partial<EvaluationQuestion>[] = filter(newEvaluationQuestions, (obj) => !has(obj, 'id'))
      const questionsToDelete: EvaluationQuestion[] = differenceWith(oldEvaluationQuestions, newEvaluationQuestions, (a, b) => a.id === b.id)
      const questionsToEdit: EvaluationQuestion[] = differenceWith(newEvaluationQuestions.filter((q) => has(q, 'id')), questionsToDelete, (a, b) => a.id === b.id)

      const createPromises = questionsToCreate.map(questionDto => {
        const question: Partial<EvaluationQuestion> = {
          questionText: questionDto.questionText,
          correctAnswers: questionDto.correctAnswers,
          options: questionDto.options,
          lectureMaterials: lectureMaterials
        }

        return this.evaluationQuestionRepository.createEvaluationQuestion(question)
      })

      const deletePromises = questionsToDelete.map(questionDto => {
        return this.evaluationQuestionRepository.deleteEvaluationQuestion(questionDto.id)
      })

      const editPromises = questionsToEdit.map(questionDto => {
        const question: Partial<EvaluationQuestion> = {
          id: questionDto.id,
          questionText: questionDto.questionText,
          correctAnswers: questionDto.correctAnswers,
          options: questionDto.options,
          lectureMaterials: lectureMaterials
        }

        return this.evaluationQuestionRepository.editEvaluationQuestion(question)
      })

      await Promise.all([...createPromises, ...deletePromises, ...editPromises])
    }
  }

  async saveEvaluationQuestionsForCourse(course: Course, newEvaluationQuestions: Partial<EvaluationQuestion>[], oldEvaluationQuestions?: Partial<EvaluationQuestion>[]) {
    if (!oldEvaluationQuestions || isEmpty(oldEvaluationQuestions)) {
      const promises = newEvaluationQuestions.map(questionDto => {
        const question: Partial<EvaluationQuestion> = {
          questionText: questionDto.questionText,
          correctAnswers: questionDto.correctAnswers,
          options: questionDto.options,
          course: course
        }

        return this.evaluationQuestionRepository.createEvaluationQuestion(question)
      })

      await Promise.all(promises)
    }

    if (oldEvaluationQuestions && !isEmpty(oldEvaluationQuestions)) {
      const questionsToCreate: Partial<EvaluationQuestion>[] = filter(newEvaluationQuestions, (obj) => !has(obj, 'id'))
      const questionsToDelete: EvaluationQuestion[] = differenceWith(oldEvaluationQuestions, newEvaluationQuestions, (a, b) => a.id === b.id)
      const questionsToEdit: EvaluationQuestion[] = differenceWith(newEvaluationQuestions.filter((q) => has(q, 'id')), questionsToDelete, (a, b) => a.id === b.id)

      const createPromises = questionsToCreate.map(questionDto => {
        const question: Partial<EvaluationQuestion> = {
          questionText: questionDto.questionText,
          correctAnswers: questionDto.correctAnswers,
          options: questionDto.options,
          course: course
        }

        return this.evaluationQuestionRepository.createEvaluationQuestion(question)
      })

      const deletePromises = questionsToDelete.map(questionDto => {
        return this.evaluationQuestionRepository.deleteEvaluationQuestion(questionDto.id)
      })

      const editPromises = questionsToEdit.map(questionDto => {
        const question: Partial<EvaluationQuestion> = {
          id: questionDto.id,
          questionText: questionDto.questionText,
          correctAnswers: questionDto.correctAnswers,
          options: questionDto.options,
          course: course
        }

        return this.evaluationQuestionRepository.editEvaluationQuestion(question)
      })

      await Promise.all([...createPromises, ...deletePromises, ...editPromises])
    }
  }
}
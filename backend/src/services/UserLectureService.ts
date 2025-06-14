import { Inject, Injectable } from "@nestjs/common";
import { isEmpty, differenceWith, intersectionWith } from "lodash";
import { Lecture } from "src/models/Lecture";
import { UserLecture } from "src/models/UserLecture";
import { IUserLectureRepository } from "src/repositories/UserLectureRepository";

export interface IUserLectureService {
  saveUserLecture(lecture: Lecture, newRelations: Partial<UserLecture>[], oldRelations?: Partial<UserLecture>[])
}

@Injectable()
export class UserLectureService implements IUserLectureService {
  constructor(
    @Inject('IUserLectureRepository') private readonly userLectureRepository: IUserLectureRepository,
  ) { }

  async saveUserLecture(lecture: Lecture, newRelations: Partial<UserLecture>[], oldRelations?: Partial<UserLecture>[]) {

    if (!oldRelations || isEmpty(oldRelations)) {
      const promises = newRelations.map(userLectureDto => {
        const userLecture: Partial<UserLecture> = {
          user: userLectureDto.user,
          lecture: lecture,
          isCompleted: userLectureDto.isCompleted,
          isLector: userLectureDto.isLector,
          isGotAcademicHours: userLectureDto.isGotAcademicHours,
        }

        return this.userLectureRepository.createUserLecture(userLecture)
      })

      await Promise.all(promises)
    }


    if (oldRelations && !isEmpty(oldRelations)) {
      const relationsToCreate: Partial<UserLecture>[] = differenceWith(newRelations, oldRelations, this.isSameRelation)
      const relationsToDelete: UserLecture[] = differenceWith(oldRelations, newRelations, this.isSameRelation)
      const relationsToEdit: UserLecture[] = intersectionWith(newRelations, oldRelations, this.isSameRelation)

      const createPromises = relationsToCreate.map(userLectureDto => {
        const userLecture: Partial<UserLecture> = {
          user: userLectureDto.user,
          lecture: lecture,
          isCompleted: userLectureDto.isCompleted,
          isLector: userLectureDto.isLector,
          isGotAcademicHours: userLectureDto.isGotAcademicHours,
        }
        return this.userLectureRepository.createUserLecture(userLecture)
      })

      const editPromises = relationsToEdit.map(userLectureDto => {
        const userLecture: Partial<UserLecture> = {
          user: userLectureDto.user,
          lecture: lecture,
          isCompleted: userLectureDto.isCompleted,
          isLector: userLectureDto.isLector,
          isGotAcademicHours: userLectureDto.isGotAcademicHours,
        }

        return this.userLectureRepository.updateUserLecture(userLecture)
      })

      const deletePromises = relationsToDelete.map(userLectureDto => {
        console.log("IS REMOVING", { user: userLectureDto.user.id, lecture: userLectureDto.lecture.id })
        return this.userLectureRepository.deleteUserLecture(userLectureDto.user.id, userLectureDto.lecture.id)
      })

      await Promise.all([...createPromises, ...editPromises, ...deletePromises])
    }
  }

  private isSameRelation(a: UserLecture, b: UserLecture) {
    return a.lecture.id === b.lecture.id && a.user.id === b.user.id
  }
}
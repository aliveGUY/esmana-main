import { User } from "../User"

export class CreateStudentIdentityDto {
  city: string
  birthDate: Date
  workplace: string
  position: string
  education: string[]
  fieldOfWork: string
  diplomaNumber: string
  personalDataCollectionConsent: boolean
  user: User
}
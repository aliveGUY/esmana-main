import { User } from "../User"

export class CreateMemberIdentityDto {
  city: string
  birthDate: Date
  workplace: string
  position: string
  education: string[]
  fieldOfWork: string
  diplomaNumber: string
  personalDataCollectionConsent: boolean
  residenceAddress: string
  country: string
  region: string
  taxpayerId: string
  passportId: string
  passportIssuedBy: string
  educationInstitution: string
  workExperience: string
  relevantTopics: string
  user: User
}
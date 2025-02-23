export class MemberRegistrationDto {
  email: string
  phone: string
  password: string
  firstName: string
  middleName: string
  lastName: string
  birthDate: string
  city: string
  workplace: string
  position: string
  education: string[]
  fieldOfWork: string
  diplomaNumber: string
  residenceAddress: string
  country: string
  region: string
  taxpayerId: string
  passportId: string
  passportIssuedBy: string
  educationInstitution: string
  workExperience: string
  relevantTopics: string
  personalDataCollectionConsent: boolean
}
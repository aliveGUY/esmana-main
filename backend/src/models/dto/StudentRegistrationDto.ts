export class StudentRegistrationDto {
  email: string
  phone: string
  password: string
  firstName: string
  middleName: string
  lastName: string
  birthDate: Date
  city: string
  workplace: string
  position: string
  education: string[]
  fieldOfWork: string
  diplomaNumber: string
  personalDataCollectionConsent: boolean
}
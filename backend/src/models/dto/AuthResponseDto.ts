export class AuthResponseDto {
  user: {
    id: string;
    email: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    profilePicture?: string;
    isEmailVerified: boolean;
  };
}

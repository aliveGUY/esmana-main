import { AuthProvider } from './enums';

export class User {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  googleId?: string;
  profilePicture?: string;
  provider: AuthProvider;
  isEmailVerified: boolean;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  isGoogleUser(): boolean {
    return this.provider === AuthProvider.GOOGLE;
  }

  isLocalUser(): boolean {
    return this.provider === AuthProvider.LOCAL;
  }
}

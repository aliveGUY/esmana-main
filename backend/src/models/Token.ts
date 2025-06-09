
export class AccessTokenData {
  userId: number;
  email: string;
  roles: string[];
}

export class RefreshTokenData {
  userId: number;
  email: string;
  roles: string[];
  accessToken: string
}
import { TokenType } from './enums';

export class Token {
  id: string;
  userId: string;
  type: TokenType;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  isRevoked: boolean;
  revokedAt?: Date;

  constructor(partial: Partial<Token>) {
    Object.assign(this, partial);
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  isValid(): boolean {
    return !this.isRevoked && !this.isExpired();
  }

  revoke(): void {
    this.isRevoked = true;
    this.revokedAt = new Date();
  }
}

export class TokenData {
  userId: string;
  type: TokenType;
  email: string;
  roles: string[];
  createdAt: Date;
  expiresAt: Date;
  userAgent?: string;
  ipAddress?: string;
  isRevoked: boolean;
  refreshTokenId?: string;
  metadata?: any;
}

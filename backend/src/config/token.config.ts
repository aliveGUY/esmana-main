import { registerAs } from '@nestjs/config';

export default registerAs('token', () => ({
  accessTokenExpiresIn: process.env.TOKEN_ACCESS_EXPIRES_IN || '15m',
  refreshTokenExpiresIn: process.env.TOKEN_REFRESH_EXPIRES_IN || '7d',
}));

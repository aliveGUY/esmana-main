import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { UserGoogleRegistrationDto } from 'src/models/dto/UserGoogleRegistrationDto';

export interface IGoogleClient {
  verifyAuthToken(token: string): Promise<UserGoogleRegistrationDto>
}

@Injectable()
export class GoogleClient implements IGoogleClient {
  private oAuth2Client: OAuth2Client;

  constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );

    // this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
  }

  async verifyAuthToken(token: string): Promise<UserGoogleRegistrationDto> {
    const ticket: LoginTicket = await this.oAuth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload: TokenPayload | undefined = ticket.getPayload()

    if (!payload
      || !payload.given_name
      || !payload.family_name
      || !payload.email
      || !payload.email_verified) { throw Error('Error in verifyAuthToken') }

    const user: UserGoogleRegistrationDto = {
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email,
      googleId: payload.sub,
      isEmailVerified: payload.email_verified
    }

    return user
  }
}
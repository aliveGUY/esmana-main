import { Injectable, OnModuleInit } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleMeetClient {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );

    // this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
  }

  learning(): string {
    const url = this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        'https://www.googleapis.com/auth/calendar'
      ]
    })

    return url
  }

  async redirect() {
    return "Its working"
  }
}

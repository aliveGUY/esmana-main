import { Injectable } from '@nestjs/common';
import { calendar_v3, drive_v3, google, youtube_v3 } from 'googleapis';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { UserGoogleRegistrationDto } from 'src/models/dto/UserGoogleRegistrationDto';
import * as fs from 'fs';
import * as path from 'path';

export interface IGoogleClient {
  verifyAuthToken(token: string): Promise<UserGoogleRegistrationDto>;
  createMeetingLink(title: string, startTime: Date, endTime: Date): Promise<string>;
  searchUploadedVideos(title: string): Promise<{ title: string; videoId: string }[]>;
  uploadHelloWorldFileToDrive(): Promise<string>;
}

@Injectable()
export class GoogleClient implements IGoogleClient {
  private oAuth2Client: OAuth2Client;
  private calendar: calendar_v3.Calendar;
  private youtube: youtube_v3.Youtube;
  private drive: drive_v3.Drive;

  constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    this.oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    this.calendar = google.calendar({ version: 'v3', auth: this.oAuth2Client });
    this.youtube = google.youtube({ version: 'v3', auth: this.oAuth2Client });
    this.drive = google.drive({ version: 'v3', auth: this.oAuth2Client });
  }

  async verifyAuthToken(token: string): Promise<UserGoogleRegistrationDto> {
    const ticket: LoginTicket = await this.oAuth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload: TokenPayload | undefined = ticket.getPayload();

    if (
      !payload ||
      !payload.given_name ||
      !payload.family_name ||
      !payload.email ||
      !payload.email_verified
    ) {
      throw Error('Error in verifyAuthToken');
    }

    return {
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email,
      googleId: payload.sub,
      isEmailVerified: payload.email_verified,
    };
  }

  async createMeetingLink(title: string, startTime: Date, endTime: Date): Promise<string> {
    const event = await this.calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: {
        summary: title,
        start: { dateTime: new Date(startTime).toISOString(), timeZone: 'UTC' },
        end: { dateTime: new Date(endTime).toISOString(), timeZone: 'UTC' },
        conferenceData: {
          createRequest: {
            requestId: Math.random().toString(36).substring(2),
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      },
    });

    return event.data.hangoutLink || '';
  }

  async searchUploadedVideos(query: string = ''): Promise<
    { title: string; videoId: string; thumbnail: string }[]
  > {
    if (!query.trim()) {
      const channels = await this.youtube.channels.list({
        part: ['contentDetails'],
        mine: true,
      });

      const uploadsPlaylistId = channels.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
      if (!uploadsPlaylistId) throw new Error('Could not find uploads playlist');

      const playlistItems = await this.youtube.playlistItems.list({
        part: ['snippet', 'contentDetails'],
        playlistId: uploadsPlaylistId,
        maxResults: 5,
      });

      return (
        playlistItems.data.items?.map((item) => ({
          title: item.snippet?.title || 'Untitled',
          videoId: item.snippet?.resourceId?.videoId || '',
          thumbnail:
            item.snippet?.thumbnails?.high?.url ||
            item.snippet?.thumbnails?.medium?.url ||
            item.snippet?.thumbnails?.default?.url ||
            '',
        })) || []
      );
    }

    const searchResponse = await this.youtube.search.list({
      part: ['snippet'],
      q: query,
      type: ['video'],
      maxResults: 5,
      order: 'relevance',
    });

    return (
      searchResponse.data.items?.map((item) => ({
        title: item.snippet?.title || 'Untitled',
        videoId: item.id?.videoId || '',
        thumbnail:
          item.snippet?.thumbnails?.high?.url ||
          item.snippet?.thumbnails?.medium?.url ||
          item.snippet?.thumbnails?.default?.url ||
          '',
      })) || []
    );
  }


  async uploadHelloWorldFileToDrive(): Promise<string> {
    const folderName = 'api-service';

    // Check if folder exists
    const list = await this.drive.files.list({
      q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
      spaces: 'drive',
    });

    let folderId: string;

    if (list.data.files && list.data.files.length > 0) {
      folderId = list.data.files[0].id!;
    } else {
      // Create folder
      const folder = await this.drive.files.create({
        requestBody: {
          name: folderName,
          mimeType: 'application/vnd.google-apps.folder',
        },
        fields: 'id',
      });
      folderId = folder.data.id!;
    }

    // Write temp hello.txt file
    const filePath = path.join(__dirname, 'hello.txt');
    fs.writeFileSync(filePath, 'Hello World!', 'utf8');

    const response = await this.drive.files.create({
      requestBody: {
        name: 'hello.txt',
        parents: [folderId],
      },
      media: {
        mimeType: 'text/plain',
        body: fs.createReadStream(filePath),
      },
      fields: 'id, webViewLink, name',
    });

    // Optional: clean up file
    fs.unlinkSync(filePath);

    return response.data.webViewLink || '';
  }
}

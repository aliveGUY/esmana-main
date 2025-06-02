import { Injectable } from '@nestjs/common';
import { calendar_v3, drive_v3, google, youtube_v3 } from 'googleapis';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { UserGoogleRegistrationDto } from 'src/models/dto/UserGoogleRegistrationDto';
import * as fs from 'fs';
import * as path from 'path';
import { Readable } from 'stream';
import { isEmpty } from 'class-validator';

export interface IGoogleClient {
  verifyAuthToken(token: string): Promise<UserGoogleRegistrationDto>;
  createMeetingLink(title: string, startTime: Date, endTime: Date): Promise<string>;
  searchUploadedVideos(title: string): Promise<{ title: string; videoId: string }[]>;
  uploadMulterFileToDrive(file: Express.Multer.File): Promise<string>;
  getFileStreamById(fileId: string): Promise<{ stream: Readable; mimeType: string }>
  deleteFileIfExists(fileId: string): Promise<void>
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

  async uploadMulterFileToDrive(file: Express.Multer.File): Promise<string> {
    const folderName = 'api-service';

    const list = await this.drive.files.list({
      q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id)',
      spaces: 'drive',
    });

    let folderId = list.data.files?.[0]?.id;
    if (!folderId) {
      const folder = await this.drive.files.create({
        requestBody: {
          name: folderName,
          mimeType: 'application/vnd.google-apps.folder',
        },
        fields: 'id',
      });
      folderId = folder.data.id!;
    }

    const tempPath = path.join(__dirname, file.originalname);
    fs.writeFileSync(tempPath, file.buffer);

    const uploaded = await this.drive.files.create({
      requestBody: {
        name: file.originalname,
        parents: [folderId],
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(tempPath),
      },
      fields: 'id',
    });

    await this.drive.permissions.create({
      fileId: uploaded.data.id!,
      requestBody: { role: 'reader', type: 'anyone' },
    });

    fs.unlinkSync(tempPath);

    return uploaded.data.id!;
  }

  async getFileStreamById(fileId: string): Promise<{ stream: Readable; mimeType: string }> {
    const metadata = await this.drive.files.get({
      fileId,
      fields: 'mimeType',
    });

    const mimeType = metadata.data.mimeType ?? 'application/octet-stream';

    const file = await this.drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' as const }
    );

    return {
      stream: file.data,
      mimeType,
    };
  }

  async deleteFileIfExists(fileId: string): Promise<void> {
    if (isEmpty(fileId)) return

    try {
      await this.drive.files.delete({ fileId });
    } catch (error: any) {
      if (error?.code === 404) return;
      throw error;
    }
  }


  async searchUploadedVideos(query: string = ''): Promise<
    { title: string; videoId: string; thumbnail: string }[]
  > {
    if (!query.trim()) {
      return await this.getFiveLatestVideos()
    }

    return await this.searchFiveVideos(query)
  }

  private async getFiveLatestVideos() {
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

  private async searchFiveVideos(title: string) {
    const channels = await this.youtube.channels.list({
      part: ['contentDetails'],
      mine: true,
    });

    const uploadsPlaylistId = channels.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) throw new Error('Could not find uploads playlist');

    let allItems: any[] = [];
    let nextPageToken: string | undefined = undefined;

    do {
      const playlistItems = await this.youtube.playlistItems.list({
        part: ['snippet', 'contentDetails'],
        playlistId: uploadsPlaylistId,
        maxResults: 100, // TODO: Refactor
        pageToken: nextPageToken,
      });

      allItems.push(...(playlistItems.data.items || []));
      nextPageToken = playlistItems.data.nextPageToken;
    } while (nextPageToken);

    const filtered = allItems
      .filter((item) =>
        item.snippet?.title?.toLowerCase().includes(title.toLowerCase())
      )
      .slice(0, 5);

    return filtered.map((item) => ({
      title: item.snippet?.title || 'Untitled',
      videoId: item.snippet?.resourceId?.videoId || '',
      thumbnail:
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.medium?.url ||
        item.snippet?.thumbnails?.default?.url ||
        '',
    }));
  }

}

import { Injectable } from '@nestjs/common';
import { google, youtube_v3 } from 'googleapis';

@Injectable()
export class YouTubeClient {
  private youtube: youtube_v3.Youtube

  constructor() {
    this.youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY
    })
  }

  async searchVideos(query: string) {
    try {
      const response = await this.youtube.search.list({
        part: ['snippet'],
        q: query,
        maxResults: 5
      })

      return response.data.items;
    } catch (error) {
      console.log('Error fetching videos:', error)
      throw error
    }
  }
}
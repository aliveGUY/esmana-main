import { Controller, Get, Param, Req, Sse, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { map, Observable } from "rxjs";
import { AuthenticatedGuard } from "src/guards/AuthenticatedGuard";
import { Notification } from "src/models/Notification";
import { User } from "src/models/User";
import { NotificationService } from "src/services/notificationService";

interface MessageEvent {
  data: string | object
}

@Controller('/notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService,
  ) { }

  @Sse('/listen')
  @UseGuards(AuthenticatedGuard)
  listenNotifications(@Req() req: Request): Observable<MessageEvent> {
    return this.notificationService.getNotifications(req.user as User).pipe(
      map((data) => ({ data: { data: data.data, type: data.type, cast: data.cast } })),
    );
  }

  @Get('pending-courses/:userId')
  @UseGuards(AuthenticatedGuard)
  getPendingCoursesByUserId(@Param('userId') userId: string): Promise<Notification[]> {
    return this.notificationService.getPendingCoursesByUserId(Number(userId))
  }
}
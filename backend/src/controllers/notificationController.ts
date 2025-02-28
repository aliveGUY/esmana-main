import { Body, Controller, Get, Param, Post, Request, Sse, UseGuards } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { AuthenticatedGuard } from "src/guards/AuthenticatedGuard";
import { Course } from "src/models/Course";
import { CourseNotificationPayloadDto } from "src/models/dto/CourseNotificationPayloadDto";
import { CreateMembershipNotificationDto } from "src/models/dto/CreateMembershipNotificationDto";
import { MembershipNotificationPayloadDto } from "src/models/dto/MembershipNotificationPayloadDto";
import { Notification } from "src/models/Notification";
import { NotificationService } from "src/services/notificationService";

interface MessageEvent {
  data: string | object
}

@Controller('/notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService,
  ) { }

  @Sse('/event')
  sendEvent(): Observable<MessageEvent> {
    return this.notificationService.getNotifications().pipe(
      map((data) => ({ data: data.payload })),
    )
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  getAllNotifications(@Request() req): Promise<Notification[]> {
    return this.notificationService.getAllNotifications(req.user)
  }

  @Post('/pending-course-purchase')
  createPendingCoursePurchaseNotification(@Body() { user, course }: CourseNotificationPayloadDto): Promise<Course | null> {
    return this.notificationService.createPendingCoursePurchaseNotification(user, course)
  }

  @Post('/pending-membership-purchase')
  createPendingMembershipPurchaseNotification(@Body() { user, membership }: MembershipNotificationPayloadDto): Promise<CreateMembershipNotificationDto> {
    return this.notificationService.createPendingMembershipPurchaseNotification(user, membership)
  }

  @Get('/:id')
  @UseGuards(AuthenticatedGuard)
  getNotificationById(@Request() req, @Param('id') id: string): Promise<Notification> {
    return this.notificationService.getNotificationById(Number(id), req.user)
  }

  @Get('pending-courses/:userId')
  @UseGuards(AuthenticatedGuard)
  getPendingCoursesByUserId(@Param('userId') userId: string): Promise<Notification[]> {
    return this.notificationService.getPendingCoursesByUserId(Number(userId))
  }
}
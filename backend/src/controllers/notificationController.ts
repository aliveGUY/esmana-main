import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "src/guards/AuthenticatedGuard";
import { CourseNotificationPayloadDto } from "src/models/dto/CourseNotificationPayloadDto";
import { CreateCourseNotificationDto } from "src/models/dto/CreateCourseNotificationDto";
import { CreateMembershipNotificationDto } from "src/models/dto/CreateMembershipNotificationDto";
import { MembershipNotificationPayloadDto } from "src/models/dto/MembershipNotificationPayloadDto";
import { Notification } from "src/models/Notification";
import { NotificationService } from "src/services/notificationService";

@Controller('/notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService,
  ) { }

  @Get()
  @UseGuards(AuthenticatedGuard)
  getAllNotifications(@Request() req): Promise<Notification[]> {
    return this.notificationService.getAllNotifications(req.user)
  }

  @Post('/pending-course-purchase')
  createPendingCoursePurchaseNotification(@Body() { user, course }: CourseNotificationPayloadDto): Promise<CreateCourseNotificationDto> {
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
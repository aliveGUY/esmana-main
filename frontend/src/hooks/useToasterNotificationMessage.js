import {
  CAST_TYPE_ADMINS,
  CAST_TYPE_USER,
  NOTIFICATION_TYPE_COURSE_PURCHASE,
  SSE_TYPE_ADD_BELL_NOTIFICATION,
  SSE_TYPE_ADD_TOASTER_NOTIFICATION,
} from '../constants/notifications'

export const useToasterNotificationMessage = () => {
  const messages = {
    [SSE_TYPE_ADD_TOASTER_NOTIFICATION]: {
      [NOTIFICATION_TYPE_COURSE_PURCHASE]: {
        [CAST_TYPE_ADMINS]: ({ course, user }) => ({
          title: 'New student joined course',
          description: `${user.firstName} now have access to ${course.title}`,
        }),
        [CAST_TYPE_USER]: ({ course }) => ({
          title: "You've successfully joined course",
          description: `You now have access to ${course.title}`,
        }),
      },
    },
    [SSE_TYPE_ADD_BELL_NOTIFICATION]: {
      [NOTIFICATION_TYPE_COURSE_PURCHASE]: {
        [CAST_TYPE_ADMINS]: ({ course, user }) => ({
          title: 'New student joined course',
          description: `${user.firstName} now have access to ${course.title}`,
        }),
        [CAST_TYPE_USER]: ({ course }) => ({
          title: "You've successfully joined course",
          description: `You now have access to ${course.title}`,
        }),
      },
    },
  }

  return (notificationType, eventType, castType, notification) => {
    const message = messages[notificationType][eventType][castType]
    return message(notification)
  }
}

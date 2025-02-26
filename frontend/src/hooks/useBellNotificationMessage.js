import {
  NOTIFICATION_TYPE_UNKNOWN,
  NOTIFICATION_TYPE_MEMBERSHIP_IS_EXPIRED,
  NOTIFICATION_TYPE_MEMBERSHIP_WILL_EXPIRE,
  NOTIFICATION_TYPE_PENDING_COURSE_PURCHASE,
  NOTIFICATION_TYPE_PENDING_MEMBERSHIP_PURCHASE,
} from "../constants/notifications";

export const useBellNotificationMessage = (props) => {
  const { type, course, user } = props;
  const messages = {
    [NOTIFICATION_TYPE_UNKNOWN]: {
      title: "Unknown Notification",
      description: "::ERROR::",
    },
    [NOTIFICATION_TYPE_MEMBERSHIP_IS_EXPIRED]: {
      title: "Membership is expired",
      description: "Not implemented",
    },
    [NOTIFICATION_TYPE_MEMBERSHIP_WILL_EXPIRE]: {
      title: "Membership soon will be expired",
      description: "Not implemented",
    },
    [NOTIFICATION_TYPE_PENDING_COURSE_PURCHASE]: {
      title: "Requested Course Purchase!",
      description: `${[user.firstName, user.middleName, user.lastName].join(
        " "
      )} has requested to join ${course.title}`,
    },
    [NOTIFICATION_TYPE_PENDING_MEMBERSHIP_PURCHASE]: {
      title: "Requested Membership Purchase!",
      description: "Not implemented",
    },
  };

  return messages[type];
};

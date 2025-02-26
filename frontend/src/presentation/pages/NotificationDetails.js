import React, { useCallback } from "react";
import {
  useApproveCourseRequestMutation,
  useGetNotificationByIdQuery,
} from "../../state/asynchronous/users";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { find, isEmpty } from "lodash";
import { format } from "date-fns";
import NotificationDetailsUser from "../components/NotificationDetailsUser";
import NotificationDetailsCourse from "../components/NotificationDetailsCourse";
import NotificationDetailsMembership from "../components/NotificationDetailsMembership";

const NotificationDetails = () => {
  const [searchParams] = useSearchParams();
  const nid = searchParams.get("nid");
  const { isLoading: isGetNotificationLoading, isError } =
    useGetNotificationByIdQuery(nid);
  const [approveCourseRequest, { isLoading: isApproveLoading }] =
    useApproveCourseRequestMutation();

  const notifications = useSelector((state) => state.notifications.collection);

  const notification = find(
    notifications,
    (notification) => notification.id === Number(nid)
  );

  const handleApprove = useCallback(
    () => approveCourseRequest(notification),
    [notification]
  );

  if (isError) return "Error";

  if (isEmpty(notification) || isGetNotificationLoading) return "Loading...";

  const { course, membership, user, createdAt } = notification;
  const formattedDate = format(createdAt, "yyyy/MM/dd HH:mm");

  return (
    <div className="card notification-page">
      <p>Created at {formattedDate}</p>
      <NotificationDetailsUser user={user} />
      <NotificationDetailsCourse course={course} />
      <NotificationDetailsMembership membership={membership} />
      <button
        className="button black medium"
        disabled={isApproveLoading}
        onClick={handleApprove}
      >
        {isApproveLoading ? "Loading..." : "Approve"}
      </button>
    </div>
  );
};

export default React.memo(NotificationDetails);

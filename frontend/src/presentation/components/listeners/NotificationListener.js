import React, { Fragment, useCallback, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { BASE_URL } from "../../../constants/config";
import {
  SSE_TYPE_ADD_BELL_NOTIFICATION,
  SSE_TYPE_ADD_TOASTER_NOTIFICATION,
  SSE_TYPE_REMOVE_BELL_NOTIFICATION,
} from "../../../constants/notifications";
import { useToasterNotificationMessage } from "../../../hooks/useToasterNotificationMessage";
import { useDispatch } from "react-redux";
import {
  addToasterNotification,
  removeToasterNotification,
} from "../../../state/reducers/notifications";

const NotificationListener = () => {
  const { isAuthorized } = useAuth();
  const getMessage = useToasterNotificationMessage();
  const dispatch = useDispatch();

  const sseEventMap = useCallback(
    (type) => {
      const map = {
        [SSE_TYPE_ADD_BELL_NOTIFICATION]: (data) => console.log({ data }),
        [SSE_TYPE_REMOVE_BELL_NOTIFICATION]: (data) => console.log({ data }),
        [SSE_TYPE_ADD_TOASTER_NOTIFICATION]: (data) => {
          dispatch(addToasterNotification(data));
          setTimeout(() => {
            dispatch(removeToasterNotification(data));
          }, 4000);
        },
      };
      return map[type];
    },
    [dispatch]
  );

  useEffect(() => {
    if (isAuthorized) {
      const eventSource = new EventSource(`${BASE_URL}/notification/listen`, {
        withCredentials: true,
      });

      eventSource.onmessage = (e) => {
        const event = JSON.parse(e.data);
        const action = sseEventMap(event.type);
        const message = getMessage(
          event.type,
          event.data.type,
          event.cast,
          event.data
        );
        action({
          message,
          notificationId: event.data.id,
          severity: event.data.severity,
        });
      };
    }
  }, [isAuthorized, getMessage, sseEventMap]);

  return <Fragment></Fragment>;
};

export default React.memo(NotificationListener);

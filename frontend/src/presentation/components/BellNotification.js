import React, { useCallback } from "react";
import { useBellNotificationMessage } from "../../hooks/useBellNotificationMessage";
import { useNavigate } from "react-router-dom";

const BellNotification = ({ notification, onClick }) => {
  const { severity, type, course, membership, user } = notification;
  const navigate = useNavigate();
  const { title, description } = useBellNotificationMessage({
    type,
    course,
    membership,
    user,
  });

  const redirect = useCallback(() => {
    onClick();
    navigate(`notification-details?nid=${notification.id}`);
  }, [onClick, navigate, notification.id]);

  return (
    <div className={`bell-notification ${severity}`} onClick={redirect}>
      <h4 className="title">{title}</h4>
      <p className="description">{description}</p>
    </div>
  );
};

export default React.memo(BellNotification);

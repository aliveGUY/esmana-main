import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const BellNotification = ({ notification, onClick }) => {
  const { severity } = notification;
  const navigate = useNavigate();

  const redirect = useCallback(() => {
    onClick();
    navigate(`dashboard/notification-details?nid=${notification.id}`);
  }, [onClick, navigate, notification.id]);

  return (
    <div className={`bell-notification ${severity}`} onClick={redirect}>
      <h4 className="title">title</h4>
      <p className="description">description</p>
    </div>
  );
};

export default React.memo(BellNotification);

import React, { useCallback, useRef } from "react";
import { useGetAllNotificationsQuery } from "../../state/asynchronous/users";
import BellIcon from "../../static/images/bell.svg";
import { useSelector } from "react-redux";
import Popup from "../common/Popup";
import { isEmpty, map } from "lodash";
import BellNotification from "./BellNotification";

const Notifications = () => {
  const ref = useRef();
  const notifications = useSelector((state) => state.notifications.collection);

  useGetAllNotificationsQuery();

  const togglePopup = useCallback(() => ref.current.toggle(), []);
  const closePopup = useCallback(() => ref.current.close(), []);

  return (
    <div className="notification-wrapper">
      <Popup
        ref={ref}
        isToggle
        content={
          <div className="bell-notifications-wrapper">
            {map(notifications, (notification, index) => (
              <BellNotification
                key={index}
                notification={notification}
                onClick={closePopup}
              />
            ))}
          </div>
        }
      >
        <button onClick={togglePopup} className="notification-icon-button">
          {!isEmpty(notifications) && (
            <label className="notification-count">{notifications.length}</label>
          )}
          <img src={BellIcon} alt="notification icon" className="icon" />
        </button>
      </Popup>
    </div>
  );
};

export default React.memo(Notifications);

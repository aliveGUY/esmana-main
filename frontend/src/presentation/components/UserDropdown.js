import React, { useCallback, useRef } from "react";
import { useLogoutMutation } from "../../state/asynchronous/users";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../static/images/user-icon.svg";
import Popup from "../common/Popup";
import { useAuth } from "../../hooks/useAuth";

const UserDropdown = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const ref = useRef();
  const { isUnauthorized } = useAuth();

  const handleLogout = useCallback(() => {
    ref.current?.close();
    logout();
    navigate("login");
  }, [logout]);

  const togglePopup = useCallback(() => ref.current?.toggle(), []);

  if (isUnauthorized) return;

  return (
    <div className="user-icon-wrapper">
      <Popup
        ref={ref}
        isToggle
        content={
          <div className="select-option-wrapper">
            <button onClick={handleLogout} className="select-option">
              Logout
            </button>
          </div>
        }
      >
        <div className="user-icon-background" onClick={togglePopup}>
          <img src={UserIcon} alt="User Icon" className="user-icon" />
        </div>
      </Popup>
    </div>
  );
};

export default React.memo(UserDropdown);

import React, { useCallback, useEffect, useRef } from "react";
import { useLogoutMutation } from "../../state/asynchronous/users";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../static/images/user-icon.svg";
import Popup from "../common/Popup";

const UserDropdown = () => {
  const [logout, { isSuccess }] = useLogoutMutation();
  const navigate = useNavigate();
  const ref = useRef();

  const handleLogout = useCallback(() => {
    logout();
    ref.current?.close();
  }, [logout]);
  const openPopup = useCallback(() => ref.current?.open(), []);

  useEffect(() => {
    if (isSuccess) {
      navigate("login");
    }
  }, [isSuccess, navigate]);

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
        <div className="user-icon-background" onClick={openPopup}>
          <img src={UserIcon} alt="User Icon" className="user-icon" />
        </div>
      </Popup>
    </div>
  );
};

export default React.memo(UserDropdown);

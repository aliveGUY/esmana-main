import React, { useCallback, useEffect } from "react";
import { useLogoutMutation } from "../../state/asynchronous/users";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../static/images/user-icon.svg";

const UserDropdown = () => {
  const [logout, { isSuccess }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = useCallback(logout, [logout]);

  useEffect(() => {
    if (isSuccess) {
      navigate("login");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="user-dropdown">
      <button className="button medium outlined black user-dropdown-input">
        <img src={UserIcon} alt="User Icon" className="icon" />
      </button>
      <div className="options-list">
        <button onClick={handleLogout} className="option button small">
          Logout
        </button>
      </div>
    </div>
  );
};

export default React.memo(UserDropdown);

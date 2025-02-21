import React, { useCallback, useEffect, useState } from "react";
import { useLogoutMutation } from "../../state/asynchronous/users";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../static/images/user-icon.svg";

const UserDropdown = () => {
  const [logout, { isSuccess }] = useLogoutMutation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(logout, [logout]);
  const handleOpen = useCallback(
    () => setOpen((prev) => !prev),
    [open, setOpen]
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("login");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="user-dropdown">
      <button
        onClick={handleOpen}
        className="button medium outlined black user-dropdown-input"
      >
        <img src={UserIcon} alt="User Icon" className="icon" />
      </button>
      <div className={`options-list ${open && "open"}`}>
        <button onClick={handleLogout} className="option button small">
          Logout
        </button>
      </div>
    </div>
  );
};

export default React.memo(UserDropdown);

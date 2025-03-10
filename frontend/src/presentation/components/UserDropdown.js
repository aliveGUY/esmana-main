import React, { useCallback, useRef } from "react";
import { useLogoutMutation } from "../../state/asynchronous/users";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../static/images/user-icon.svg";
import Popup from "../common/Popup";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { removeUserFromState } from "../../state/reducers/auth";

const UserDropdown = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const ref = useRef();
  const { user } = useAuth();
  const dispatch = useDispatch();

  const redirectCabinet = useCallback(() => {
    navigate(`/dashboard/cabinet/${user.id}`);
    ref.current?.close();
  }, [navigate, user.id]);

  const handleLogout = useCallback(() => {
    ref.current?.close();
    dispatch(removeUserFromState());
    logout();
    navigate("/login");
  }, [logout, navigate, dispatch]);

  const togglePopup = useCallback(() => ref.current?.toggle(), []);

  return (
    <div className="user-icon-wrapper">
      <Popup
        ref={ref}
        isToggle
        content={
          <div className="select-option-wrapper">
            <button onClick={redirectCabinet} className="select-option">
              Cabinet
            </button>
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

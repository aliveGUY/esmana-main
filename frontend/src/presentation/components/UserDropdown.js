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
  const { isUnauthorized, user } = useAuth();

  const redirectCabinet = useCallback(() => {
    navigate(`/cabinet/${user.id}`);
    ref.current?.close();
  }, [navigate]);

  const redirectStudent = useCallback(() => {
    navigate("/student-registration");
    ref.current?.close();
  }, [navigate]);

  const redirectClients = useCallback(() => {
    navigate("/clients");
    ref.current?.close();
  }, [navigate]);

  const redirectMember = useCallback(() => {
    navigate("/member-registration?sync=no");
    ref.current?.close();
  }, [navigate]);

  const redirectCourse = useCallback(() => {
    navigate("/courses/new");
    ref.current?.close();
  }, [navigate]);

  const redirectCoursesList = useCallback(() => {
    navigate("/courses");
    ref.current?.close();
  }, [navigate]);

  const handleLogout = useCallback(() => {
    ref.current?.close();
    logout();
    navigate("login");
  }, [logout, navigate]);

  const togglePopup = useCallback(() => ref.current?.toggle(), []);

  if (isUnauthorized) return;

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
            <button onClick={redirectCoursesList} className="select-option">
              Courses
            </button>
            <button onClick={redirectClients} className="select-option">
              Clients
            </button>
            <button onClick={redirectCourse} className="select-option">
              Create new Course
            </button>
            <button onClick={redirectStudent} className="select-option">
              Register new Student
            </button>
            <button onClick={redirectMember} className="select-option">
              Register new Member
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

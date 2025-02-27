import React from "react";
import NavLogo from "../../static/images/logo-big.png";
import UserDropdown from "./UserDropdown";
import Notifications from "./Notifications";
import { useAuth } from "../../hooks/useAuth";
import SideNav from "./SideNav";

const Navigation = ({ children }) => {
  const { isAuthorized } = useAuth();
  return (
    <div className={`app-wrapper ${!isAuthorized && "unauthed"}`}>
      <div className="top-bar-navigation">
        <div className="navigation-section">
          <img src={NavLogo} alt="Esmana logo" className="logo" />
        </div>

        {isAuthorized && (
          <div className="navigation-section actions">
            <Notifications />
            <UserDropdown />
          </div>
        )}
      </div>
      {isAuthorized && <SideNav />}
      <div className="content-wrapper">{children}</div>
    </div>
  );
};

export default React.memo(Navigation);

import React from "react";
import BackLink from "./BackLink";
import NavLogo from "../../static/images/logo-big.png";
import UserDropdown from "./UserDropdown";
import Notifications from "./Notifications";
import { useAuth } from "../../hooks/useAuth";

const Navigation = () => {
  const { isAuthorized } = useAuth();
  return (
    <div className="top-bar-navigation">
      <div className="navigation-section">
        <img src={NavLogo} alt="Esmana logo" className="logo" />
        <BackLink />
      </div>

      {isAuthorized && (
        <div className="navigation-section actions">
          <Notifications />
          <UserDropdown />
        </div>
      )}
    </div>
  );
};

export default React.memo(Navigation);

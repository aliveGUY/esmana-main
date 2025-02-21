import React from "react";
import BackLink from "./BackLink";
import NavLogo from "../../static/images/logo-big.png";
import UserDropdown from "./UserDropdown";

const Navigation = () => {
  return (
    <div className="top-bar-navigation">
      <img src={NavLogo} alt="Esmana logo" className="logo" />
      <BackLink />
      <UserDropdown />
    </div>
  );
};

export default React.memo(Navigation);

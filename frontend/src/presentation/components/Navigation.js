import React from "react";
import BackLink from "./BackLink";

const Navigation = () => {
  return (
    <div className="top-bar-navigation">
      <h2>Esmana</h2>
      <BackLink />
    </div>
  );
};

export default React.memo(Navigation);

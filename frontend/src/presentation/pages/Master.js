import React, { useEffect } from "react";
import { useOutlet } from "react-router-dom";

import { useCurrentRoute } from "../../hooks/useCurrentRoute";
import Navigation from "../components/Navigation";

const MasterPage = () => {
  const outlet = useOutlet();

  const currentRoute = useCurrentRoute();

  useEffect(() => {
    document.title = currentRoute?.title;
  }, [currentRoute?.title]);

  return (
    <div>
      <Navigation />
      <div className="layout">{outlet}</div>;
    </div>
  );
};

export default React.memo(MasterPage);

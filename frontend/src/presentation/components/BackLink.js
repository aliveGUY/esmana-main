import React, { useCallback } from "react";
import { useNavigate, useMatch } from "react-router";

const BackLink = () => {
  const navigate = useNavigate();
  const isHome = useMatch("/") !== null;

  const redirect = useCallback(() => navigate("/"), []);

  return (
    <div className={`back-button-container ${isHome && "hidden"}`}>
      <button
        className="button black small outlined back-button"
        onClick={redirect}
      >
        <span className="material-symbols-outlined">arrow_left_alt</span>
        Back
      </button>
    </div>
  );
};

export default React.memo(BackLink);

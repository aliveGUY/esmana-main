import React, { useCallback } from "react";
import { useNavigate, useMatch } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const BackLink = () => {
  const navigate = useNavigate();
  const isHome = useMatch("/") !== null;
  const { isUnauthorized } = useAuth();

  const redirect = useCallback(() => navigate("/"), [navigate]);

  if (isUnauthorized) return;

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

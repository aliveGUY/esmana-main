import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useMatch } from "react-router";
import { isEmpty } from "lodash";

const BackLink = () => {
  const navigate = useNavigate();
  const isHome = useMatch("/") !== null;
  const user = useSelector((state) => state.auth.user);

  const redirect = useCallback(() => navigate("/"), [navigate]);

  if (isEmpty(user)) return;

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

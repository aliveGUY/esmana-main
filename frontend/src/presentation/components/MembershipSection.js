import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MembershipSection = () => {
  const navigate = useNavigate();
  const isIdentityComplete = useSelector(
    (state) => state.auth.isIdentityComplete
  );

  const redirect = useCallback(() => {
    if (isIdentityComplete) {
      navigate("/memberships");
      return;
    }
    navigate("/member-registration?sync=yes");
  }, [isIdentityComplete]);

  return (
    <div className="cta-placeholder-card">
      <h2 className="title">You dont have active membership plan yet</h2>
      <button className="button lightblue medium outlined" onClick={redirect}>
        Buy new membership
      </button>
    </div>
  );
};

export default React.memo(MembershipSection);

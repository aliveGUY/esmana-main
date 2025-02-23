import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const MembershipSection = () => {
  const navigate = useNavigate();

  const redirect = useCallback(() => navigate("/member-registration"), []);
  return (
    <div className="cta-placeholder-card">
      <h2 className="title">You are not a member of ESMANA organization yet</h2>
      <button className="button lightblue medium outlined" onClick={redirect}>
        Become a member
      </button>
    </div>
  );
};

export default React.memo(MembershipSection);

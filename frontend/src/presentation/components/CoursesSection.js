import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const CoursesSection = () => {
  const navigate = useNavigate();

  const redirect = useCallback(() => navigate("/member-registration"), []);

  return (
    <div className="cta-placeholder-card">
      <h2 className="title">You didnt apply to any courses yet</h2>
      <button className="button lightblue medium outlined" onClick={redirect}>
        Chose course
      </button>
    </div>
  );
};

export default React.memo(CoursesSection);

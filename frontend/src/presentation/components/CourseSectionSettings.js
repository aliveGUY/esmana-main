import React, { useCallback } from "react";
import { useSetCourseStatusMutation } from "../../state/asynchronous/users";
import Switch from "../common/Inputs/Switch";

const CourseSectionSettings = (props) => {
  const { courseId, active } = props;
  const [setCourseStatus, { isLoading }] = useSetCourseStatusMutation();

  const handleStatusToggle = useCallback((e) => {
    setCourseStatus({
      id: courseId,
      active: e.target.checked,
    });
  }, []);

  return (
    <div className="details-frame-section">
      <div className="settings-group">
        <div className="settings-item">
          <span className="settings-label">Active:</span>
          {isLoading ? (
            "Loading..."
          ) : (
            <Switch checked={active} onChange={handleStatusToggle} />
          )}
        </div>
        <div className="settings-item">
          <button className="button outlined small red">Delete Course</button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CourseSectionSettings);

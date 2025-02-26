import React, { useCallback } from "react";
import {
  useDeleteCourseMutation,
  useSetCourseStatusMutation,
} from "../../state/asynchronous/users";
import Switch from "../common/Inputs/Switch";

const CourseSectionSettings = (props) => {
  const { courseId, active, onCloseFrame } = props;
  const [setCourseStatus, { isLoading: statusToggleLoading }] =
    useSetCourseStatusMutation();
  const [deleteCourse, { isLoading: courseDeletionLoading }] =
    useDeleteCourseMutation();

  const isLoading = statusToggleLoading || courseDeletionLoading;

  const handleStatusToggle = useCallback(
    (e) => {
      setCourseStatus({
        id: courseId,
        active: e.target.checked,
      });
    },
    [courseId]
  );

  const handleDeleteCourse = useCallback(() => {
    deleteCourse(courseId);
    onCloseFrame();
  }, [courseId]);

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
          <button
            className="button outlined small red"
            disabled={isLoading}
            onClick={handleDeleteCourse}
          >
            {isLoading ? "Loading..." : "Delete Course"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CourseSectionSettings);

import React, { Fragment } from "react";
import CrossIcon from "../../static/images/cross.svg";
import CheckMarkIcon from "../../static/images/check-mark.svg";
import { format } from "date-fns";
import { isEmpty } from "lodash";

const CourseHeader = (props) => {
  const { course, open, actions } = props;

  const formatDate = (date) => {
    if (isEmpty(date)) return "N/A";
    return format(new Date(date), "yyyy-MM-dd");
  };

  return (
    <Fragment>
      <div className="course-item status-column">
        <div className="status-cell">
          <div
            className={`course-status-icon ${
              course.active ? "active" : "inactive"
            }`}
          >
            <img
              src={course.active ? CheckMarkIcon : CrossIcon}
              alt="Course status icon"
            />
          </div>
        </div>
      </div>
      <div className="course-item">
        <p>{course.title}</p>
      </div>
      <div className="course-item">
        <p>{formatDate(course.beginningDate)}</p>
      </div>
      <div className="course-item">
        <p>{formatDate(course.finishDate)}</p>
      </div>
      <div className="course-item">
        <p>{course.students.length}</p>
      </div>
      <div className="course-item">
        {!open && <p className="action-cell">{actions}</p>}
      </div>
    </Fragment>
  );
};

export default React.memo(CourseHeader);

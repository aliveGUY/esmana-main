import React, { Fragment } from "react";
import CrossIcon from "../../static/images/cross.svg";
import CheckMarkIcon from "../../static/images/check-mark.svg";
import { format } from "date-fns";
import { isEmpty } from "lodash";

const CourseHeader = (props) => {
  const { onRequest, onOpenFrame, course, open, isLoading } = props;
  const date = new Date(course.beginningDate);
  const formattedDate = format(date, "yyyy-MM-dd");
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
        <p>{formattedDate}</p>
      </div>
      <div className="course-item">
        <p>{isEmpty(course.finishDate) ? "N/A" : course.finishDate}</p>
      </div>
      <div className="course-item">
        <p>{course.students.length}</p>
      </div>
      <div className="course-item">
        {!open && (
          <p className="action-cell">
            <button
              className="button black medium outlined"
              onClick={onOpenFrame}
            >
              Details
            </button>
            <button
              disabled={isLoading}
              onClick={onRequest}
              className="button black medium"
            >
              {isLoading ? "Loading" : "Send Request"}
            </button>
          </p>
        )}
      </div>
    </Fragment>
  );
};

export default React.memo(CourseHeader);

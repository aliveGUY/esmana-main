import { isEmpty, map } from "lodash";
import React, { Fragment, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const CourseItem = ({ course }) => {
  const beginningDate = isEmpty(course.beginningDate)
    ? "N/A"
    : format(course.beginningDate, "yyyy-MM-dd, HH:mm");

  const finishDate = isEmpty(course.finishDate)
    ? "N/A"
    : format(course.finishDate, "yyyy-MM-dd, HH:mm");

  return (
    <div className="course-item">
      <h4>{course.title}</h4>
      <p>
        <span className="time-badge">{beginningDate}</span> -{" "}
        <span className="time-badge">{finishDate}</span>
      </p>
    </div>
  );
};

const CoursesSection = () => {
  const navigate = useNavigate();

  const activeCourses = useSelector(
    (state) => state.courses.studentActiveCourses
  );

  const pendingCourses = useSelector(
    (state) => state.courses.studentPendingCourses
  );

  const redirect = useCallback(() => navigate("/courses"), [navigate]);

  if (isEmpty(activeCourses) && isEmpty(pendingCourses)) {
    return (
      <div className="cta-placeholder-card">
        <h2 className="title">You didnt apply to any courses yet</h2>
        <button className="button lightblue medium outlined" onClick={redirect}>
          Chose course
        </button>
      </div>
    );
  }

  return (
    <div className="courses-list-wrapper">
      {!isEmpty(activeCourses) && (
        <Fragment>
          <h3 className="title">Your courses</h3>
          <div className="courses-list">
            {map(activeCourses, (course, index) => (
              <CourseItem key={index} course={course} />
            ))}
          </div>
        </Fragment>
      )}
      {!isEmpty(pendingCourses) && (
        <Fragment>
          <h3 className="title">Awaiting Enrollment</h3>
          <div className="courses-list">
            {map(pendingCourses, (course, index) => (
              <CourseItem key={index} course={course} />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default React.memo(CoursesSection);

import { map } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import CourseListItem from "./CourseListItem";

const CoursesTable = () => {
  const courses = useSelector((state) => state.courses.collection);

  return (
    <div>
      <div className="courses-grid">
        <div className="status-column">
          <p className="grid-title status-cell">Status</p>
        </div>
        <div>
          <p className="grid-title">Title</p>
        </div>
        <div>
          <p className="grid-title">Starts at</p>
        </div>
        <div>
          <p className="grid-title">Ends at</p>
        </div>
        <div>
          <p className="grid-title">Applied</p>
        </div>
        <div>
          <p className="grid-title action-cell">Actions</p>
        </div>
      </div>
      {map(courses, (course, index) => (
        <CourseListItem course={course} key={index} />
      ))}
    </div>
  );
};

export default React.memo(CoursesTable);

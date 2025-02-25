import { isEmpty } from "lodash";
import React, { useCallback, useState } from "react";
import CrossIcon from "../../static/images/cross.svg";
import CheckMarkIcon from "../../static/images/check-mark.svg";
import { format } from "date-fns";
import CourseSectionLectures from "./CourseSectionLectures";
import CourseSectionSettings from "./CourseSectionSettings";
import CourseSectionStudents from "./CourseSectionStudents";

const CourseListItem = ({ course }) => {
  const { active, beginningDate, finishDate, lectures, title, students } =
    course;
  const date = new Date(beginningDate);
  const formattedDate = format(date, "yyyy-MM-dd");
  const [open, setOpen] = useState(false);

  const openFrame = useCallback(() => setOpen(true), [setOpen]);
  const closeFrame = useCallback(() => setOpen(false), [setOpen]);

  return (
    <div className={`courses-grid  ${open && "open"}`}>
      <div className="course-item status-column">
        <div className="status-cell">
          <div
            className={`course-status-icon ${active ? "active" : "inactive"}`}
          >
            <img
              src={active ? CheckMarkIcon : CrossIcon}
              alt="Course status icon"
            />
          </div>
        </div>
      </div>
      <div className="course-item">
        <p>{title}</p>
      </div>
      <div className="course-item">
        <p>{formattedDate}</p>
      </div>
      <div className="course-item">
        <p>{isEmpty(finishDate) ? "N/A" : finishDate}</p>
      </div>
      <div className="course-item">
        <p>{students.length}</p>
      </div>
      <div className="course-item">
        {!open && (
          <p className="action-cell">
            <button
              className="button black medium outlined"
              onClick={openFrame}
            >
              Details
            </button>
            <button className="button black medium">Join</button>
          </p>
        )}
      </div>

      <div className="details-frame">
        <CourseSectionLectures lectures={lectures} courseId={course.id} />
        <div className="details-frame-section">
          <div className="details-frame-actions">
            <button
              className="button black medium outlined"
              onClick={closeFrame}
            >
              Cancel
            </button>
            <button className="button black medium">Join</button>
          </div>
        </div>
        <div className="admin-only">
          <CourseSectionStudents students={students} />
          <hr />
          <CourseSectionSettings courseId={course.id} active={active} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CourseListItem);

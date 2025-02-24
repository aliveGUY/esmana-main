import { isEmpty, map } from "lodash";
import React, { Fragment, useCallback, useState } from "react";
import CrossIcon from "../../static/images/cross.svg";
import CheckMarkIcon from "../../static/images/check-mark.svg";
import { format } from "date-fns";
import LectureFormWidget from "./LectureFormWidget";

const CourseListItem = ({ course }) => {
  const { active, beginningDate, finishDate, title } = course;
  const date = new Date(beginningDate);
  const formattedDate = format(date, "yyyy-MM-dd");
  const [open, setOpen] = useState(false);
  const [lectureFormOpened, setLectureFormOpened] = useState(false);

  const openFrame = useCallback(() => setOpen(true), [setOpen]);
  const closeFrame = useCallback(() => setOpen(false), [setOpen]);

  const openLectureCreationWidget = useCallback(
    () => setLectureFormOpened(true),
    [setLectureFormOpened]
  );
  const closeLectureCreationWidget = useCallback(
    () => setLectureFormOpened(false),
    [setLectureFormOpened]
  );

  const dummyData = [
    {
      speakers: ["John Doe", "Jane Doe"],
      startsAt: "12:00",
      duration: "2h",
      title: "Dummy lecture",
    },
    {
      speakers: ["Jane Doe"],
      startsAt: "12:00",
      duration: "2h",
      title: "Dummy lecture",
    },
  ];

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
        <p>N/A</p>
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
        <div className="details-frame-section">
          <div className="lectures-list">
            {map(dummyData, (lecture, index) => (
              <div className="lecture-item">
                <h4 className="title">{lecture.title}</h4>
                <div className="lecture-details">
                  <p>Speaker: {lecture.speakers.join(", ")}</p>
                  <p>Starts at: {lecture.startsAt}</p>
                  <p>Duration: {lecture.duration}</p>
                </div>
              </div>
            ))}
            {lectureFormOpened ? (
              <LectureFormWidget onCancel={closeLectureCreationWidget} />
            ) : (
              <button
                className="button black small outlined"
                onClick={openLectureCreationWidget}
              >
                Add Lecture
              </button>
            )}
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default React.memo(CourseListItem);

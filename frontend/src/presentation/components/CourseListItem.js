import { isEmpty, map } from "lodash";
import React, { useCallback, useState } from "react";
import CrossIcon from "../../static/images/cross.svg";
import CheckMarkIcon from "../../static/images/check-mark.svg";
import { format } from "date-fns";
import LectureFormWidget from "./LectureFormWidget";

const CourseListItem = ({ course }) => {
  const { active, beginningDate, finishDate, lectures, title, students } =
    course;
  const date = new Date(beginningDate);
  const formattedDate = format(date, "yyyy-MM-dd");
  const [open, setOpen] = useState(false);
  const [lectureFormOpened, setLectureFormOpened] = useState(false);

  const parseSpeakerNames = (speakers) => {
    const namesArray = map(speakers, (speaker) =>
      [speaker.firstName, speaker.middleName, speaker.lastName].join(" ")
    );
    return namesArray.join(", ");
  };

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
        <div className="details-frame-section">
          <div className="lectures-list">
            {map(lectures, (lecture, index) => (
              <div className="lecture-item" key={index}>
                <h4 className="title">{lecture.title}</h4>
                <div className="lecture-details">
                  <p>Speaker: {parseSpeakerNames(lecture.speakers)}</p>
                  <p>Starts at: {format(lecture.startTime, "yyyy-MM-dd")}</p>
                  <p>Ends at: {format(lecture.endTime, "yyyy-MM-dd")}</p>
                </div>
              </div>
            ))}
            {lectureFormOpened ? (
              <LectureFormWidget
                onCancel={closeLectureCreationWidget}
                courseId={course.id}
              />
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

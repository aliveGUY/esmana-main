import React, { useCallback, useState } from "react";
import LectureFormWidget from "./LectureFormWidget";
import { format } from "date-fns";
import { map } from "lodash";

const CourseSectionLectures = (props) => {
  const { lectures, courseId } = props;
  const [lectureFormOpened, setLectureFormOpened] = useState(false);

  const parseSpeakerNames = (speakers) => {
    const namesArray = map(speakers, (speaker) =>
      [speaker.firstName, speaker.middleName, speaker.lastName].join(" ")
    );
    return namesArray.join(", ");
  };

  const openLectureCreationWidget = useCallback(
    () => setLectureFormOpened(true),
    [setLectureFormOpened]
  );
  const closeLectureCreationWidget = useCallback(
    () => setLectureFormOpened(false),
    [setLectureFormOpened]
  );

  return (
    <div className="details-frame-section">
      <div className="lectures-list">
        {map(lectures, (lecture, index) => (
          <div className="lecture-item" key={index}>
            <p className="index">{index + 1}</p>
            <div>
              <h4 className="title">{lecture.title}</h4>
              <div className="lecture-details">
                <p>Speaker: {parseSpeakerNames(lecture.speakers)}</p>
                <p>
                  Starts at: {format(lecture.startTime, "yyyy-MM-dd, HH:mm")}
                </p>
                <p>Ends at: {format(lecture.endTime, "yyyy-MM-dd, HH:mm")}</p>
              </div>
            </div>
          </div>
        ))}
        {lectureFormOpened ? (
          <LectureFormWidget
            onCancel={closeLectureCreationWidget}
            courseId={courseId}
          />
        ) : (
          <span className="add-lecture-button">
            <button
              className="button black medium outlined"
              onClick={openLectureCreationWidget}
            >
              Add Lecture
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default React.memo(CourseSectionLectures);

import React, { Fragment, useCallback, useState } from "react";
import CourseSectionLectures from "./CourseSectionLectures";
import CourseSectionSettings from "./CourseSectionSettings";
import CourseSectionStudents from "./CourseSectionStudents";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CourseHeader from "./CourseHeader";
import { useCreateCourseJoinRequestMutation } from "../../state/asynchronous/users";

const CourseListItem = ({ course }) => {
  const { active, lectures, students } = course;
  const [open, setOpen] = useState(false);
  const { isAuthorized, user } = useAuth();
  const [createCourseJoinRequest, { isLoading }] =
    useCreateCourseJoinRequestMutation();

  const navigate = useNavigate();
  const openFrame = useCallback(() => setOpen(true), [setOpen]);
  const closeFrame = useCallback(() => setOpen(false), [setOpen]);

  const handleRequest = useCallback(() => {
    if (isAuthorized) {
      createCourseJoinRequest({
        user: { id: user.id },
        course: { id: course.id },
      });
    } else {
      navigate(`/student-registration?cid=${course.id}`);
    }
  }, []);

  return (
    <Fragment>
      {!open && (
        <CourseHeader
          onRequest={handleRequest}
          onOpenFrame={openFrame}
          course={course}
          open={open}
          isLoading={isLoading}
        />
      )}

      <div className={`details-frame ${open && "open"}`}>
        <div className="courses-grid">
          <CourseHeader
            onRequest={handleRequest}
            onOpenFrame={openFrame}
            course={course}
            open={open}
          />
        </div>
        <div className="details-wrapper">
          <CourseSectionLectures lectures={lectures} courseId={course.id} />
          {isAuthorized && (
            <div className="admin-only">
              <CourseSectionStudents students={students} courseId={course.id} />
              <hr />
              <CourseSectionSettings
                courseId={course.id}
                active={active}
                onCloseFrame={closeFrame}
              />
            </div>
          )}
          <div className="details-frame-section">
            <div className="details-frame-actions">
              <button
                className="button black medium outlined"
                onClick={closeFrame}
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                onClick={handleRequest}
                className="button black medium"
              >
                {isLoading ? "Loading" : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(CourseListItem);

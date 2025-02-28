import React, { Fragment, useCallback, useState } from "react";
import CourseSectionLectures from "./CourseSectionLectures";
import CourseSectionSettings from "./CourseSectionSettings";
import CourseSectionStudents from "./CourseSectionStudents";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CourseHeader from "./CourseHeader";
import { useCreateCourseJoinRequestMutation } from "../../state/asynchronous/users";
import { useSelector } from "react-redux";
import { includes, map } from "lodash";

const CourseListItem = ({ course }) => {
  const { active, lectures, students } = course;
  const [open, setOpen] = useState(false);
  const { isAuthorized, user } = useAuth();
  const [createCourseJoinRequest, { isLoading }] =
    useCreateCourseJoinRequestMutation();

  const navigate = useNavigate();
  const openFrame = useCallback(() => setOpen(true), [setOpen]);
  const closeFrame = useCallback(() => setOpen(false), [setOpen]);

  const studentActiveCourses = useSelector(
    (state) => state.courses.studentActiveCourses
  );
  const studentPendingCourses = useSelector(
    (state) => state.courses.studentPendingCourses
  );

  const pendingIds = map(studentPendingCourses, (course) => course.id);
  const activeIds = map(studentActiveCourses, (course) => course.id);

  const disableApply = () =>
    includes(activeIds, course.id) ||
    includes(pendingIds, course.id) ||
    isLoading;

  const getApplyText = () => {
    if (includes(activeIds, course.id)) return "Already available";
    if (includes(pendingIds, course.id)) return "Request is pending";
    if (isLoading) return "Loading...";
    return "Send request";
  };

  const handleRequest = useCallback(() => {
    if (isAuthorized) {
      createCourseJoinRequest({
        user: { id: user.id },
        course: { id: course.id },
      });
    } else {
      navigate(`/student-registration?cid=${course.id}`);
    }
  }, [navigate, createCourseJoinRequest, isAuthorized, user.id, course.id]);

  return (
    <Fragment>
      {!open && (
        <CourseHeader
          course={course}
          open={open}
          actions={
            <Fragment>
              <button
                className="button black medium outlined"
                onClick={openFrame}
              >
                Details
              </button>
              <button
                disabled={disableApply()}
                onClick={handleRequest}
                className="button black medium"
              >
                {getApplyText()}
              </button>
            </Fragment>
          }
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
                disabled={disableApply()}
                onClick={handleRequest}
                className="button black medium"
              >
                {getApplyText()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(CourseListItem);

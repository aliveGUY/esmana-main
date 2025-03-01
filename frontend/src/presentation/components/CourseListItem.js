import React, { Fragment, useCallback, useState } from "react";
import CourseSectionLectures from "./CourseSectionLectures";
import CourseSectionSettings from "./CourseSectionSettings";
import CourseSectionStudents from "./CourseSectionStudents";
import { useAuth } from "../../hooks/useAuth";
import CourseHeader from "./CourseHeader";
import { useSelector } from "react-redux";
import { includes, map } from "lodash";
import { useAddStudentsToCourseMutation } from "../../state/asynchronous/users";

const CourseListItem = ({ course }) => {
  const { active, lectures, students } = course;
  const [open, setOpen] = useState(false);
  const { isAuthorized, user } = useAuth();

  const [addStudentsToCourse, { isLoading }] = useAddStudentsToCourseMutation();

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

  const handleAddStudentToCourse = useCallback(
    () =>
      addStudentsToCourse({
        courseId: course.id,
        students: [user],
      }),
    [addStudentsToCourse, course.id, user]
  );

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
                onClick={handleAddStudentToCourse}
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
            onRequest={handleAddStudentToCourse}
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
                onClick={handleAddStudentToCourse}
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

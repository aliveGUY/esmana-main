import { createSlice } from "@reduxjs/toolkit";
import { usersEndpoints } from "../asynchronous/users";
import { filter, map } from "lodash";

const mapCourses = (callback) => {
  return (state, { payload }) => {
    const newAvailableCourses = map(
      JSON.parse(JSON.stringify(state.availableCourses)),
      (course) => callback(course, payload)
    );

    state.availableCourses = newAvailableCourses;
  };
};

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    availableCourses: [],
    studentActiveCourses: [],
    studentPendingCourses: [],
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersEndpoints.getAllCourses.matchFulfilled,
      (state, { payload }) => {
        state.availableCourses = payload;
      }
    );

    builder.addMatcher(
      usersEndpoints.getAllActiveCourses.matchFulfilled,
      (state, { payload }) => {
        state.availableCourses = payload;
      }
    );

    builder.addMatcher(
      usersEndpoints.createLecture.matchFulfilled,
      mapCourses((course, payload) => {
        if (course.id === payload.course.id) course.lectures.push(payload);
        return course;
      })
    );

    builder.addMatcher(
      usersEndpoints.setCourseStatus.matchFulfilled,
      mapCourses((course, payload) => {
        if (course.id === payload.id) course.active = payload.active;
        return course;
      })
    );

    builder.addMatcher(
      usersEndpoints.deleteCourse.matchFulfilled,
      (state, { payload }) => {
        const newAvailableCourses = filter(
          JSON.parse(JSON.stringify(state.availableCourses)),
          (course) => course.id !== payload
        );

        state.availableCourses = newAvailableCourses;
      }
    );

    builder.addMatcher(
      usersEndpoints.addStudentsToCourse.matchFulfilled,
      mapCourses((course, payload) => {
        if (course.id === payload.id) course.students = payload.students;
        return course;
      })
    );

    builder.addMatcher(
      usersEndpoints.removeStudentFromCourse.matchFulfilled,
      mapCourses((course, payload) => {
        if (course.id === payload.id) course.students = payload.students;
        return course;
      })
    );

    builder.addMatcher(
      usersEndpoints.getCoursesByStudent.matchFulfilled,
      (state, { payload }) => {
        state.studentActiveCourses = payload;
      }
    );

    builder.addMatcher(
      usersEndpoints.getPendingCoursesByStudent.matchFulfilled,
      (state, { payload }) => {
        const courses = map(payload, (notification) => notification.course);
        state.studentPendingCourses = courses;
      }
    );

    builder.addMatcher(
      usersEndpoints.createCourseJoinRequest.matchFulfilled,
      (state, { payload }) => {
        const copiedPending = JSON.parse(
          JSON.stringify(state.studentPendingCourses)
        );

        state.studentPendingCourses = [...copiedPending, payload];
      }
    );
  },
});

export default coursesSlice.reducer;

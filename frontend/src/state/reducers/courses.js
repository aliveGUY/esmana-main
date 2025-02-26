import { createSlice } from "@reduxjs/toolkit";
import { usersEndpoints } from "../asynchronous/users";
import { filter, map } from "lodash";

const mapCourses = (callback) => {
  return (state, { payload }) => {
    const newCollection = map(
      JSON.parse(JSON.stringify(state.collection)),
      (course) => callback(course, payload)
    );

    state.collection = newCollection;
  };
};

const coursesSlice = createSlice({
  name: "courses",
  initialState: { collection: [] },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersEndpoints.getAllCourses.matchFulfilled,
      (state, { payload }) => {
        state.collection = payload;
      }
    );

    builder.addMatcher(
      usersEndpoints.getAllActiveCourses.matchFulfilled,
      (state, { payload }) => {
        state.collection = payload;
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
        const newCollection = filter(
          JSON.parse(JSON.stringify(state.collection)),
          (course) => course.id !== payload
        );

        state.collection = newCollection;
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
  },
});

export default coursesSlice.reducer;

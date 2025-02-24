import { createSlice } from "@reduxjs/toolkit";
import { usersEndpoints } from "../asynchronous/users";
import { map } from "lodash";

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
      (state, { payload }) => {
        const newCollection = map(
          JSON.parse(JSON.stringify(state.collection)),
          (course) => {
            if (course.id === payload.course.id) course.lectures.push(payload);
            return course;
          }
        );

        state.collection = newCollection;
      }
    );
  },
});

export default coursesSlice.reducer;

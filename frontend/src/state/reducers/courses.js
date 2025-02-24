import { createSlice } from "@reduxjs/toolkit";
import { usersEndpoints } from "../asynchronous/users";

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
  },
});

export default coursesSlice.reducer;

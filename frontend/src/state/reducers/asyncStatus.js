import { createSlice } from "@reduxjs/toolkit";
import { usersEndpoints } from "../asynchronous/users";

const asyncStatusSlice = createSlice({
  name: "asyncStatus",
  initialState: {
    getSession: {
      isUninitialized: true,
      isLoading: false,
      isSucceeded: false,
      isError: false,
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(usersEndpoints.getSession.matchPending, (state) => {
      state.getSession.isUninitialized = false;
      state.getSession.isSucceeded = false;
      state.getSession.isLoading = true;
      state.getSession.isError = false;
    });

    builder.addMatcher(usersEndpoints.getSession.matchFulfilled, (state) => {
      state.getSession.isSucceeded = true;
      state.getSession.isLoading = false;
    });

    builder.addMatcher(usersEndpoints.getSession.matchRejected, (state) => {
      state.getSession.isLoading = false;
      state.getSession.isError = true;
    });

    builder.addMatcher(usersEndpoints.login.matchFulfilled, (state) => {
      state.getSession.isSucceeded = true;
      state.getSession.isError = false;
    });
  },
});

export default asyncStatusSlice.reducer;

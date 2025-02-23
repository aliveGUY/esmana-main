import { createSlice } from "@reduxjs/toolkit";
import { usersEndpoints } from "../asynchronous/users";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: {} },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersEndpoints.login.matchFulfilled,
      (state, { payload }) => {
        const name = [
          payload.firstName,
          payload.middleName,
          payload.lastName,
        ].join(" ");

        state.user = payload;
        state.user.name = name;
      }
    );

    builder.addMatcher(
      usersEndpoints.getSession.matchFulfilled,
      (state, { payload }) => {
        const name = [
          payload.firstName,
          payload.middleName,
          payload.lastName,
        ].join(" ");

        state.user = payload;
        state.user.name = name;
      }
    );

    builder.addMatcher(usersEndpoints.logout.matchFulfilled, (state) => {
      state.user = {};
    });
  },
});

export default authSlice.reducer;

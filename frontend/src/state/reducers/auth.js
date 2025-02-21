import { createSlice } from "@reduxjs/toolkit";
import { usersEndpoints } from "../asynchronous/users";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: {} },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersEndpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    );
  },
});

export default authSlice.reducer;

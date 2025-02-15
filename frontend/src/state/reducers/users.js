import { createSlice } from "@reduxjs/toolkit";
import { usersEndpoints } from "../asynchronous/users";

const usersSlice = createSlice({
  name: "users",
  initialState: { collection: [] },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersEndpoints.getAllUsers.matchFulfilled,
      (state, action) => {
        state.collection = action.payload;
      }
    );

    builder.addMatcher(
      usersEndpoints.registerUser.matchFulfilled,
      (state, action) => {
        console.log({ action });
        state.collection = [action.payload, ...state.collection];
      }
    );
  },
});

export default usersSlice.reducer;

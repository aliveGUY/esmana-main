import { createSlice } from "@reduxjs/toolkit";
import { usersEndpoints } from "../asynchronous/users";
import { map, includes } from "lodash";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { collection: [] },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersEndpoints.getAllNotifications.matchFulfilled,
      (state, { payload }) => {
        state.collection = payload;
      }
    );

    builder.addMatcher(
      usersEndpoints.getNotificationById.matchFulfilled,
      (state, { payload }) => {
        const clonedNotifications = JSON.parse(
          JSON.stringify(state.collection)
        );

        const currentNotifications = map(
          clonedNotifications,
          (notification) => notification.id
        );

        if (!includes(currentNotifications, payload.id)) {
          state.collection = [...clonedNotifications, payload];
        }
      }
    );
  },
});

export default notificationsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { usersEndpoints } from "../asynchronous/users";
import { map, includes, filter } from "lodash";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { collection: [] },
  reducers: {
    insertNotification: (state, action) => {
      state.collection.push(action.payload);
    },
  },
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

    builder.addMatcher(
      usersEndpoints.approveCourseRequest.matchFulfilled,
      (state, { payload }) => {
        const copiedCollection = JSON.parse(JSON.stringify(state.collection));

        const newCollection = filter(copiedCollection, (notificationsSlice) => {
          if (
            notificationsSlice.course &&
            notificationsSlice.course.id === payload.id
          )
            return false;
          return true;
        });

        state.collection = newCollection;
      }
    );
  },
});

export const { insertNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;

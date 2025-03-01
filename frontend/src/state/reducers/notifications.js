import { createSlice } from "@reduxjs/toolkit";
import { filter, isEmpty } from "lodash";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { bellNotifications: [], toasterNotification: [] },
  reducers: {
    insertNotification: (state, action) => {
      state.bellNotifications.push(action.payload);
    },

    addToasterNotification: (state, { payload }) => {
      state.toasterNotification.push(payload);
    },

    removeToasterNotification: (state, { payload }) => {
      const copiedCollection = JSON.parse(
        JSON.stringify(state.toasterNotification)
      );

      const newCollection = filter(
        copiedCollection,
        (notification) => notification.notificationId !== payload.notificationId
      );

      state.toasterNotification = isEmpty(newCollection) ? [] : newCollection;
    },
  },
});

export const {
  insertNotification,
  addToasterNotification,
  removeToasterNotification,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;

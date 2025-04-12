import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersMiddleware } from "./asynchronous";
import { reducers } from "./reducers";
import usersApi from "./asynchronous";

const rootReducer = combineReducers({
  ...reducers,
  usersApi,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersMiddleware),
  devTools: process.env.NODE_ENV === "development",
});

export default store;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersMiddleware } from "./asynchronous/users";
import { reducers } from "./reducers";
import { asyncReducers } from "./asynchronous";

const rootReducer = combineReducers({
  ...reducers,
  ...asyncReducers,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersMiddleware),
});

export default store;

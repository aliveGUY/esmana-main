import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { authMiddleware, usersMiddleware } from './asynchronous'
import usersApi from './asynchronous'
import { reducers } from './reducers'

const rootReducer = combineReducers({
  ...reducers,
  usersApi,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersMiddleware, authMiddleware),
  devTools: process.env.NODE_ENV === 'development',
})

export default store

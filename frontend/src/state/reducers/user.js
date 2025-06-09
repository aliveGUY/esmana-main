import { createSlice } from '@reduxjs/toolkit'

import { usersEndpoints } from '../asynchronous'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    account: null,
    receivedUnauthorized: false,
  },
  reducers: {
    setReceivedUnauthorized: (state) => {
      state.receivedUnauthorized = true
      state.account = null
    },

    resetReceivedUnauthorized: (state) => {
      state.receivedUnauthorized = false
    },

    logout: (state) => {
      state.account = null
      state.receivedUnauthorized = false
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(usersEndpoints.login.matchFulfilled, (state, { payload }) => {
      state.account = payload
      state.receivedUnauthorized = false
    })

    builder.addMatcher(usersEndpoints.googleLogin.matchFulfilled, (state, { payload }) => {
      state.account = payload
      state.receivedUnauthorized = false
    })

    builder.addMatcher(usersEndpoints.refresh.matchFulfilled, (state, { payload }) => {
      state.account = payload
      state.receivedUnauthorized = false
    })
  },
})

export const { setReceivedUnauthorized, resetReceivedUnauthorized, logout } = userSlice.actions

export default userSlice.reducer

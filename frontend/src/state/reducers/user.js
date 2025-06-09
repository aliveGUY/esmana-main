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
    },

    resetReceivedUnauthorized: (state) => {
      state.receivedUnauthorized = false
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(usersEndpoints.login.matchFulfilled, (_, { payload }) => {
      state.account = payload
    })

    builder.addMatcher(usersEndpoints.googleLogin.matchFulfilled, (_, { payload }) => {
      state.account = payload
    })
  },
})

export const { setReceivedUnauthorized, resetReceivedUnauthorized } = userSlice.actions

export default userSlice.reducer

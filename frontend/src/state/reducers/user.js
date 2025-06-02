import { createSlice } from '@reduxjs/toolkit'

import { usersEndpoints } from '../asynchronous'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  extraReducers: (builder) => {
    builder.addMatcher(usersEndpoints.login.matchFulfilled, (_, { payload }) => {
      return payload
    })

    builder.addMatcher(usersEndpoints.googleLogin.matchFulfilled, (_, { payload }) => {
      return payload
    })

    builder.addMatcher(usersEndpoints.updateAuth.matchFulfilled, (_, { payload }) => {
      return payload
    })
  },
})

export default userSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

import { usersEndpoints } from '../asynchronous'

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    collection: [],
    highlightedCourse: null,
  },
  reducers: {
    highlightCourse: (state, action) => {
      state.highlightedCourse = action.payload
    },
    removeHighlightedCourse: (state) => {
      state.highlightedCourse = null
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(usersEndpoints.getAllCourses.matchFulfilled, (state, { payload }) => {
      state.collection = payload
    })

    builder.addMatcher(usersEndpoints.getCourseById.matchFulfilled, (state, { payload }) => {
      const index = state.collection.findIndex((course) => course.id === payload.id)

      if (index !== -1) {
        state.collection[index] = payload
      } else {
        state.collection.push(payload)
      }
    })
  },
})

export const { highlightCourse, removeHighlightedCourse } = coursesSlice.actions
export default coursesSlice.reducer

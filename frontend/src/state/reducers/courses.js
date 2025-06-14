import { createSlice } from '@reduxjs/toolkit'

import { usersEndpoints } from '../asynchronous'
import { find } from 'lodash'

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

    builder.addMatcher(usersEndpoints.evaluateLectureCompletion.matchFulfilled, (state, { payload }) => {
      const { isPassed, lectureId, userId } = payload
      const course = state.collection.find((course) => find(course.lectures, (lecture) => lecture.id === lectureId))
      const lecture = find(course.lectures, (lecture) => lecture.id === lectureId)
      const userLecture = find(lecture.users, (userLecture) => userLecture.user.id === userId)
      userLecture.isCompleted = isPassed
    })
  },
})

export const { highlightCourse, removeHighlightedCourse } = coursesSlice.actions
export default coursesSlice.reducer

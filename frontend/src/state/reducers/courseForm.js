import { createSlice } from '@reduxjs/toolkit'

import generateRandomString from '../../utils/generateRandomString'

const courseFormSlice = createSlice({
  name: 'courseForm',
  initialState: {
    thumbnail: '',
    title: '',
    description: '',
    active: false,
    participationCertificate: '',
    bprCertificate: '',
    bprEvaluation: [],
    students: [],
    lectures: [],
  },
  reducers: {
    addBprQuestion: (state, { payload }) => {
      const temporaryId = generateRandomString(10)

      const newQuestion = {
        id: temporaryId,
        question: payload,
        options: [],
        answers: [],
      }

      state.bprEvaluation.push(newQuestion)
    },

    removeBprQuestion: (state, { payload }) => {
      state.bprEvaluation = state.bprEvaluation.filter((q) => q.id !== payload)
    },

    addBprOption: (state, { payload }) => {
      const { questionId, option } = payload

      const question = state.bprEvaluation.find((q) => q.id === questionId)
      question.options.push(option)
    },

    removeBprOption: (state, { payload }) => {
      const { questionId, option } = payload

      const question = state.bprEvaluation.find((q) => q.id === questionId)
      question.answers = question.answers.filter((answer) => answer !== option)
      question.options = question.options.filter((answer) => answer !== option)
    },

    setBprQuestionAnswer: (state, { payload }) => {
      const { questionId, option } = payload

      const question = state.bprEvaluation.find((q) => q.id === questionId)
      question.answers.push(option)
    },

    removeBprQuestionAnswer: (state, { payload }) => {
      const { questionId, option } = payload

      const question = state.bprEvaluation.find((q) => q.id === questionId)
      question.answers = question.answers.filter((answer) => answer !== option)
    },

    addLecture: (state, { payload }) => {
      const temporaryId = generateRandomString(10)
      payload.id = temporaryId
      state.lectures.push(payload)
    },

    editLecture: (state, { payload }) => {
      const { lectureId, lecture } = payload
      const lectureIndex = state.lectures.findIndex((l) => l.id === lectureId)

      if (lectureIndex !== -1) {
        state.lectures[lectureIndex] = {
          ...state.lectures[lectureIndex],
          ...lecture,
          id: lectureId,
        }
      }
    },
  },
})

export const {
  addBprQuestion,
  removeBprQuestion,
  addBprOption,
  removeBprOption,
  setBprQuestionAnswer,
  removeBprQuestionAnswer,
  addLecture,
  editLecture,
} = courseFormSlice.actions
export default courseFormSlice.reducer

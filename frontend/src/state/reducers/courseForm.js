import { createSlice } from '@reduxjs/toolkit'

import generateRandomString from '../../utlis/generateRandomString'

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
  },
})

export const {
  addBprQuestion,
  removeBprQuestion,
  addBprOption,
  removeBprOption,
  setBprQuestionAnswer,
  removeBprQuestionAnswer,
} = courseFormSlice.actions
export default courseFormSlice.reducer

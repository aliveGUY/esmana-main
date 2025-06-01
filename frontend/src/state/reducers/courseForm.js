import { createSlice } from '@reduxjs/toolkit'

import { CERTIFICATE_TEMPLATE_EXAMPLE } from '../../constants'
import generateRandomString from '../../utils/generateRandomString'

const courseFormSlice = createSlice({
  name: 'courseForm',
  initialState: {
    thumbnailUrl: '',
    title: '',
    description: '',
    isActive: false,
    participationCertificate: CERTIFICATE_TEMPLATE_EXAMPLE,
    bprCertificate: CERTIFICATE_TEMPLATE_EXAMPLE,
    bprEvaluation: [],
    lectures: [],
  },
  reducers: {
    addBprQuestion: (state, { payload }) => {
      const temporaryId = generateRandomString(10)

      const newQuestion = {
        id: temporaryId,
        questionText: payload,
        options: [],
        correctAnswers: [],
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
      question.correctAnswers = question.correctAnswers.filter((answer) => answer !== option)
      question.options = question.options.filter((answer) => answer !== option)
    },

    setBprQuestionAnswer: (state, { payload }) => {
      const { questionId, option } = payload

      const question = state.bprEvaluation.find((q) => q.id === questionId)
      question.correctAnswers.push(option)
    },

    removeBprQuestionAnswer: (state, { payload }) => {
      const { questionId, option } = payload

      const question = state.bprEvaluation.find((q) => q.id === questionId)
      question.correctAnswers = question.correctAnswers.filter((answer) => answer !== option)
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

    setTitle: (state, { payload }) => {
      state.title = payload
    },

    setDescription: (state, { payload }) => {
      state.description = payload
    },

    setIsActive: (state, { payload }) => {
      state.isActive = payload
    },

    setThumbnailUrl: (state, { payload }) => {
      state.thumbnailUrl = payload
    },

    setParticipationCertificate: (state, { payload }) => {
      state.participationCertificate = payload
    },

    setBprCertificate: (state, { payload }) => {
      state.bprCertificate = payload
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
  setTitle,
  setDescription,
  setIsActive,
  setThumbnailUrl,
  setParticipationCertificate,
  setBprCertificate,
} = courseFormSlice.actions
export default courseFormSlice.reducer

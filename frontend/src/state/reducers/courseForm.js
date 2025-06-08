import { createSlice } from '@reduxjs/toolkit'

import generateRandomString from '../../utils/generateRandomString'

export const INITIAL_STATE = {
  thumbnailFile: null,
  title: '',
  description: '',
  isActive: false,
  participationCertificate: null,
  bprCertificate: null,
  bprEvaluation: [],
  lectures: [],
}

const courseFormSlice = createSlice({
  name: 'courseForm',
  initialState: INITIAL_STATE,
  reducers: {
    resetCourseForm: (_) => {
      return INITIAL_STATE
    },

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

    setThumbnailFile: (state, { payload }) => {
      state.thumbnailFile = payload
    },

    setParticipationCertificate: (state, { payload }) => {
      state.participationCertificate = payload
    },

    setBprCertificate: (state, { payload }) => {
      state.bprCertificate = payload
    },

    setBprEvaluation: (state, { payload }) => {
      state.bprEvaluation = payload
    },

    setLectures: (state, { payload }) => {
      state.lectures = payload
    },

    setThumbnailUrl: (state, { payload }) => {
      state.thumbnailUrl = payload
    },

    setId: (state, { payload }) => {
      state.id = payload
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
  setThumbnailFile,
  setParticipationCertificate,
  setBprCertificate,
  resetCourseForm,
  setBprEvaluation,
  setLectures,
  setThumbnailUrl,
  setId,
} = courseFormSlice.actions
export default courseFormSlice.reducer

import { useState } from 'react'

import generateRandomString from '../utils/generateRandomString'

export default function useLectureEvaluationFromControls(defaultValue = []) {
  const [lectureEvaluation, setLectureEvaluation] = useState(defaultValue)

  const handleRemoveQuestion = (questionId) => {
    setLectureEvaluation((prev) => prev.filter((question) => question.id !== questionId))
  }

  const handleAddQuestion = (data) => {
    const temporaryId = generateRandomString(10)

    const newQuestion = {
      id: temporaryId,
      questionText: data,
      options: [],
      correctAnswers: [],
    }

    setLectureEvaluation((prev) => [...prev, newQuestion])
  }

  const handleRemoveOption = ({ questionId, option }) => {
    setLectureEvaluation((prev) =>
      prev.map((question) => {
        if (question.id !== questionId) return question
        return {
          ...question,
          options: question.options.filter((_option) => _option !== option),
          correctAnswers: question.correctAnswers.filter((answer) => answer !== option),
        }
      }),
    )
  }

  const handleAddOption = ({ questionId, option }) => {
    setLectureEvaluation((prev) =>
      prev.map((question) => {
        if (question.id !== questionId) return question
        return {
          ...question,
          options: [...question.options, option],
        }
      }),
    )
  }

  const handleRemoveQuestionAnswer = ({ questionId, option }) => {
    setLectureEvaluation((prev) =>
      prev.map((question) => {
        if (question.id !== questionId) return question
        return {
          ...question,
          correctAnswers: question.correctAnswers.filter((answer) => answer !== option),
        }
      }),
    )
  }

  const handleSetQuestionAnswer = ({ questionId, option }) => {
    setLectureEvaluation((prev) =>
      prev.map((question) => {
        if (question.id !== questionId) return question
        return {
          ...question,
          correctAnswers: [...question.correctAnswers, option],
        }
      }),
    )
  }

  return {
    lectureEvaluation,
    handleRemoveQuestionAnswer,
    handleSetQuestionAnswer,
    handleRemoveQuestion,
    handleRemoveOption,
    handleAddQuestion,
    handleAddOption,
  }
}

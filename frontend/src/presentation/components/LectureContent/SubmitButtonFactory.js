import React from 'react'
import { useLectures } from '../../../hooks'
import { useFormContext } from 'react-hook-form'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'

const AnswerButton = () => {
  const { isLastLecture, currentLecture } = useLectures()
  const { getValues } = useFormContext()
  const state = getValues('collection')
  const evaluation = currentLecture?.materials?.evaluation || []

  const isAnsweredAllQuestions = !isEmpty(state) && state.length === evaluation.length

  const handleAnswerSubmit = () => {
    console.log({ state })
  }

  return (
    <Button variant="primary" disabled={!isAnsweredAllQuestions} onClick={handleAnswerSubmit}>
      {isLastLecture ? 'Finish' : 'Answer'}
    </Button>
  )
}

const NextButton = () => {
  const { nextAvailableLectureLink } = useLectures()
  return (
    <Button variant="primary" component={Link} to={nextAvailableLectureLink} disabled={!nextAvailableLectureLink}>
      Next
    </Button>
  )
}

const SubmitButtonFactory = () => {
  const { currentUserLecture } = useLectures()

  if (!currentUserLecture || currentUserLecture.isCompleted) {
    return <NextButton />
  }

  return <AnswerButton />
}

export default SubmitButtonFactory

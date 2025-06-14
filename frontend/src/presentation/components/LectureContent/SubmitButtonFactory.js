import React, { useCallback, useEffect } from 'react'
import { useAuth, useLectures } from '../../../hooks'
import { useFormContext } from 'react-hook-form'
import { Button } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { useEvaluateLectureCompletionMutation } from '../../../state/asynchronous'

const AnswerButton = ({ onSubmit, isLoading }) => {
  const { getValues } = useFormContext()
  const { isLastLecture, currentLecture } = useLectures()

  const state = getValues('collection')
  const evaluation = currentLecture?.materials?.evaluation || []
  const isAnsweredAllQuestions = !isEmpty(state) && state.length === evaluation.length

  const actionText = isLastLecture ? 'Finish' : 'Answer'
  const stateText = isLoading ? 'Loading...' : actionText

  return (
    <Button variant="primary" disabled={isLoading || !isAnsweredAllQuestions} onClick={onSubmit}>
      {stateText}
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
  const { user } = useAuth()
  const navigate = useNavigate()
  const { getValues } = useFormContext()
  const { lectureId, courseId } = useParams()
  const { currentUserLecture, firstIncompleteLectureId } = useLectures()
  const [evaluateLectureCompletion, { isLoading, data }] = useEvaluateLectureCompletionMutation()

  const state = getValues('collection')

  useEffect(() => {
    if (data?.isPassed && firstIncompleteLectureId && firstIncompleteLectureId !== Number(lectureId)) {
      navigate(`/dashboard/course/${courseId}/${firstIncompleteLectureId}`)
    }
  }, [data?.isPassed, firstIncompleteLectureId])

  const handleAnswerSubmit = useCallback(() => {
    const payload = {
      lectureId: Number(lectureId),
      userId: user.id,
      answers: state,
    }
    evaluateLectureCompletion(payload)
  }, [state])

  if (!currentUserLecture || currentUserLecture.isCompleted) {
    return <NextButton />
  }

  return <AnswerButton onSubmit={handleAnswerSubmit} isLoading={isLoading} />
}

export default SubmitButtonFactory

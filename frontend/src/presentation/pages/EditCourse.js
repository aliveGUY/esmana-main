import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Stack } from '@mui/material'
import { useGetCourseByIdQuery } from '../../state/asynchronous'
import {
  addBprOption,
  addBprQuestion,
  removeBprOption,
  removeBprQuestion,
  removeBprQuestionAnswer,
  setBprCertificate,
  setBprEvaluation,
  setBprQuestionAnswer,
  setDescription,
  setIsActive,
  setLectures,
  setParticipationCertificate,
  setTitle,
} from '../../state/reducers/courseForm'
import CertificatesSection from '../components/CourseFrom/CertificatesSection'
import GeneralCourseInputSection from '../components/CourseFrom/GeneralCourseInputSection'
import ImageInputSection from '../components/CourseFrom/ImageInputSection'
import LecturesSection from '../components/CourseFrom/LecturesSection'
import SubmitSection from '../components/CourseFrom/SubmitSection'
import TestSection from '../components/CourseFrom/TestSection'

const EditCourse = () => {
  const { courseId } = useParams()
  const { isLoading, data } = useGetCourseByIdQuery(courseId)
  const dispatch = useDispatch()
  const courseForm = useSelector((state) => state.courseForm)

  const onSubmit = (e) => {
    e.preventDefault()
  }

  const handleAddBprOption = ({ questionId, option }) => {
    dispatch(addBprOption({ questionId, option }))
  }

  const handleAddBprQuestion = (data) => {
    dispatch(addBprQuestion(data))
  }

  const handleRemoveBprOption = ({ questionId, option }) => {
    dispatch(removeBprOption({ questionId, option }))
  }

  const handleRemoveBprQuestion = (questionId) => {
    dispatch(removeBprQuestion(questionId))
  }

  const handleRemoveBprQuestionAnswer = ({ questionId, option }) => {
    dispatch(removeBprQuestionAnswer({ questionId, option }))
  }

  const handleSetBprQuestionAnswer = ({ questionId, option }) => {
    dispatch(setBprQuestionAnswer({ questionId, option }))
  }

  useEffect(() => {
    if (!data) return

    dispatch(setTitle(data.title))
    dispatch(setDescription(data.description))
    dispatch(setIsActive(data.isActive))
    dispatch(setParticipationCertificate(data.participationCertificate))
    dispatch(setBprCertificate(data.bprCertificate))
    dispatch(setBprEvaluation(data.bprEvaluation))
    dispatch(setLectures(data.lectures))
  }, [data])

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ pb: 5 }}>
        <ImageInputSection />
        <GeneralCourseInputSection />
        <LecturesSection isEdit />
        <CertificatesSection />
        <TestSection
          title="BPR evaluation"
          data={courseForm.bprEvaluation}
          onAddOption={handleAddBprOption}
          onAddQuestion={handleAddBprQuestion}
          onRemoveOption={handleRemoveBprOption}
          onRemoveQuestion={handleRemoveBprQuestion}
          onRemoveQuestionAnswer={handleRemoveBprQuestionAnswer}
          onSetQuestionAnswer={handleSetBprQuestionAnswer}
        />
        <SubmitSection />
      </Stack>
    </form>
  )
}

export default EditCourse

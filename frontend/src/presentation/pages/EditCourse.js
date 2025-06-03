import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { isEqual, omit } from 'lodash'

import { Stack } from '@mui/material'
import { useEditCourseMutation, useGetCourseByIdMutation } from '../../state/asynchronous'
import {
  addBprOption,
  addBprQuestion,
  INITIAL_STATE,
  removeBprOption,
  removeBprQuestion,
  removeBprQuestionAnswer,
  setBprCertificate,
  setBprEvaluation,
  setBprQuestionAnswer,
  setDescription,
  setId,
  setIsActive,
  setLectures,
  setParticipationCertificate,
  setThumbnailUrl,
  setTitle,
} from '../../state/reducers/courseForm'
import CertificatesSection from '../components/CourseFrom/CertificatesSection'
import GeneralCourseInputSection from '../components/CourseFrom/GeneralCourseInputSection'
import ImageInputSection from '../components/CourseFrom/ImageInputSection'
import LecturesSection from '../components/CourseFrom/LecturesSection'
import SubmitSection from '../components/CourseFrom/SubmitSection'
import TestSection from '../components/CourseFrom/TestSection'
import { removeEditorIdsDeep } from './CreateCourse'

const EditCourse = () => {
  const { courseId } = useParams()
  const [getCourseById, { isLoading, data }] = useGetCourseByIdMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const courseForm = useSelector((state) => state.courseForm)
  const [editCourse, { isLoading: isEditLoading, isSuccess }] = useEditCourseMutation()

  const onSubmit = (e) => {
    e.preventDefault()

    const cleanedData = removeEditorIdsDeep(omit(courseForm, ['thumbnailFile', 'thumbnailUrl']))

    cleanedData.lectures.forEach((lecture) => {
      lecture.price = Number(lecture.price)
    })

    const formData = new FormData()

    if (courseForm.thumbnailFile) {
      formData.append('thumbnail', courseForm.thumbnailFile)
    }

    formData.append('data', JSON.stringify(cleanedData))

    editCourse(formData)
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
    if (isEqual(courseForm, INITIAL_STATE)) {
      getCourseById(courseId)
    }
  }, [courseForm])

  useEffect(() => {
    if (!data) return

    dispatch(setId(data.id))
    dispatch(setTitle(data.title))
    dispatch(setDescription(data.description))
    dispatch(setIsActive(data.isActive))
    dispatch(setParticipationCertificate(data.participationCertificate))
    dispatch(setBprCertificate(data.bprCertificate))
    dispatch(setBprEvaluation(data.bprEvaluation))
    dispatch(setLectures(data.lectures))
    dispatch(setThumbnailUrl(data.thumbnailUrl))
  }, [data])

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard/courses')
    }
  }, [isSuccess])

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
        <SubmitSection isLoading={isEditLoading} />
      </Stack>
    </form>
  )
}

export default EditCourse

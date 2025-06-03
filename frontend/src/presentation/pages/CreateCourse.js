import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isArray, isPlainObject, mapValues, omit } from 'lodash'

import { Stack } from '@mui/material'
import { useCreateCourseMutation } from '../../state/asynchronous'
import {
  addBprOption,
  addBprQuestion,
  removeBprOption,
  removeBprQuestion,
  removeBprQuestionAnswer,
  setBprQuestionAnswer,
} from '../../state/reducers/courseForm'
import CertificatesSection from '../components/CourseFrom/CertificatesSection'
import GeneralCourseInputSection from '../components/CourseFrom/GeneralCourseInputSection'
import ImageInputSection from '../components/CourseFrom/ImageInputSection'
import LecturesSection from '../components/CourseFrom/LecturesSection'
import SubmitSection from '../components/CourseFrom/SubmitSection'
import TestSection from '../components/CourseFrom/TestSection'

export function removeEditorIdsDeep(value) {
  if (isArray(value)) {
    return value.map(removeEditorIdsDeep)
  }

  if (isPlainObject(value)) {
    const cloned = { ...value }

    const idValue = cloned.id
    const idIsValid = typeof idValue === 'number' || (typeof idValue === 'string' && /^\d+$/.test(idValue))

    if (!idIsValid) {
      delete cloned.id
    }

    return mapValues(cloned, removeEditorIdsDeep)
  }

  return value
}

const CreateCourse = () => {
  const [createCourse] = useCreateCourseMutation()
  const dispatch = useDispatch()
  const courseForm = useSelector((state) => state.courseForm)

  const onSubmit = (e) => {
    e.preventDefault()

    const cleanedData = removeEditorIdsDeep(omit(courseForm, ['thumbnailFile']))

    cleanedData.lectures.forEach((lecture) => {
      lecture.price = Number(lecture.price)
    })

    const formData = new FormData()
    formData.append('data', JSON.stringify(cleanedData))

    if (courseForm.thumbnailFile) {
      formData.append('thumbnail', courseForm.thumbnailFile)
    }

    createCourse(formData)
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

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2} sx={{ pb: 5 }}>
        <ImageInputSection />
        <GeneralCourseInputSection />
        <LecturesSection />
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

export default CreateCourse

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Stack } from '@mui/material'
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
import { isArray, isPlainObject, mapValues, omit } from 'lodash'

function removeIdsDeep(value) {
  if (isArray(value)) {
    return value.map(removeIdsDeep)
  }

  if (isPlainObject(value)) {
    const cleaned = omit(value, 'id')
    return mapValues(cleaned, removeIdsDeep)
  }

  return value
}

const CreateCourse = () => {
  const dispatch = useDispatch()
  const courseForm = useSelector((state) => state.courseForm)

  const onSubmit = (e) => {
    e.preventDefault()
    const createCourseData = removeIdsDeep(courseForm)
    createCourseData.lectures.forEach((lecture) => {
      lecture.price = Number(lecture.price)
    })
    console.log({ createCourseData })
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
        <LecturesSection data={courseForm.lectures} />
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

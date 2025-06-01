import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'

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
import PeopleSection from '../components/CourseFrom/PeopleSection'
import SubmitSection from '../components/CourseFrom/SubmitSection'
import TestSection from '../components/CourseFrom/TestSection'

const CreateCourse = () => {
  const dispatch = useDispatch()
  const courseForm = useSelector((state) => state.courseForm)

  const methods = useForm({
    defaultValues: {
      thumbnail: courseForm.thumbnail,
      title: courseForm.title,
      description: courseForm.description,
      active: courseForm.active,
      participationCertificate: courseForm.participationCertificate,
      bprCertificate: courseForm.bprCertificate,
      students: [],
    },
  })

  const onSubmit = (data) => {
    data.bprEvaluation = courseForm.bprEvaluation
    data.lectures = courseForm.lectures

    // Submit the form data
    // console.log({ data })
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ pb: 5 }}>
          <ImageInputSection />
          <GeneralCourseInputSection />
          <LecturesSection data={courseForm.lectures} />
          {/* <PeopleSection title="Students" actionText="Add Student" /> */}
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
    </FormProvider>
  )
}

export default CreateCourse

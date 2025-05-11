import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'

import { Button, Stack } from '@mui/material'
import { ENGLISH, UKRAINIAN } from '../../constants'
import useLectureEvaluationFromControls from '../../hooks/useLectureEvaluationFromControls'
import { addLecture } from '../../state/reducers/courseForm'
import { convertLectureDatesFormToStorage } from '../../utils/lectureDates'
import SectionWrapper from '../common/SectionWrapper'
import GeneralLectureInputSection from '../components/CourseFrom/GeneralLectureInputSection'
import LectureDetailsInputSection from '../components/CourseFrom/LectureDetailsInputSection'
import LectureMaterialSection from '../components/CourseFrom/LectureMaterialSection'
import PeopleSection from '../components/CourseFrom/PeopleSection'
import SubmitSection from '../components/CourseFrom/SubmitSection'
import TestSection from '../components/CourseFrom/TestSection'
import VideoSection from '../components/CourseFrom/VideoSection'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const CreateLecture = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    lectureEvaluation,
    handleRemoveQuestionAnswer,
    handleSetQuestionAnswer,
    handleRemoveQuestion,
    handleRemoveOption,
    handleAddQuestion,
    handleAddOption,
  } = useLectureEvaluationFromControls()

  const methods = useForm({
    defaultValues: {
      embeddedVideo: '',
      title: '',
      description: '',
      price: '',
      date: '',
      startHour: '',
      endHour: '',
      richText: {
        [UKRAINIAN]: '',
        [ENGLISH]: '',
      },
    },
  })

  const onSubmit = (data) => {
    const { startHour, endHour } = convertLectureDatesFormToStorage({
      date: data.date,
      startHour: data.startHour,
      endHour: data.endHour,
    })

    const payload = {
      title: data.title,
      description: data.description,
      price: data.price,
      startHour: startHour,
      endHour: endHour,
      materials: {
        embeddedVideo: '',
        richText: data.richText,
        evaluation: lectureEvaluation,
      },
    }

    dispatch(addLecture(payload))
    navigate('/dashboard/course/new')
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ pb: 5 }}>
          <SectionWrapper>
            <Button startIcon={<ArrowBackIcon />} to="/dashboard/course/new" component={Link} variant="outlined">
              Back
            </Button>
          </SectionWrapper>
          <VideoSection />
          <GeneralLectureInputSection />
          <LectureDetailsInputSection />
          <PeopleSection title="Lectors" actionText="Add Lector" />
          <PeopleSection title="Passed students" actionText="Add Student" />
          <LectureMaterialSection />
          <TestSection
            title="Lecture evaluation"
            data={lectureEvaluation}
            onAddOption={handleAddOption}
            onAddQuestion={handleAddQuestion}
            onRemoveOption={handleRemoveOption}
            onRemoveQuestion={handleRemoveQuestion}
            onRemoveQuestionAnswer={handleRemoveQuestionAnswer}
            onSetQuestionAnswer={handleSetQuestionAnswer}
          />
          <SubmitSection />
        </Stack>
      </form>
    </FormProvider>
  )
}

export default CreateLecture

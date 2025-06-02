import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
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

const CreateLecture = ({ isEdit = false }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courseId } = useParams()

  const {
    lectureEvaluation,
    handleRemoveQuestionAnswer,
    handleSetQuestionAnswer,
    handleRemoveQuestion,
    handleRemoveOption,
    handleAddQuestion,
    handleAddOption,
  } = useLectureEvaluationFromControls()

  const redirect = isEdit ? `/dashboard/course/edit/${courseId}` : '/dashboard/course/new'

  const methods = useForm({
    defaultValues: {
      videoUrl: '',
      title: '',
      description: '',
      price: '',
      date: '',
      startTime: '',
      endTime: '',
      users: [],
      richText: {
        [UKRAINIAN]: '',
        [ENGLISH]: '',
      },
    },
  })

  const onSubmit = (data) => {
    const { startTime, endTime } = convertLectureDatesFormToStorage({
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
    })

    const payload = {
      title: data.title,
      description: data.description,
      price: data.price,
      startTime: startTime,
      endTime: endTime,
      materials: {
        videoUrl: data.videoUrl,
        richText: data.richText,
        evaluation: lectureEvaluation,
      },
    }

    console.log({ payload })
    dispatch(addLecture(payload))
    navigate(redirect)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ pb: 5 }}>
          <SectionWrapper>
            <Button startIcon={<ArrowBackIcon />} to={redirect} component={Link} variant="outlined">
              Back
            </Button>
          </SectionWrapper>
          <VideoSection />
          <GeneralLectureInputSection />
          <LectureDetailsInputSection />
          <PeopleSection />
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

import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { find } from 'lodash'
import { FormProvider, useForm } from 'react-hook-form'

import { Box, Button, Stack } from '@mui/material'
import useLectureEvaluationFromControls from '../../hooks/useLectureEvaluationFromControls'
import { convertLectureDatesStorageToForm } from '../../utils/lectureDates'
import GeneralLectureInputSection from '../components/CourseFrom/GeneralLectureInputSection'
import LectureDetailsInputSection from '../components/CourseFrom/LectureDetailsInputSection'
import LectureMaterialSection from '../components/CourseFrom/LectureMaterialSection'
import PeopleSection from '../components/CourseFrom/PeopleSection'
import SubmitSection from '../components/CourseFrom/SubmitSection'
import TestSection from '../components/CourseFrom/TestSection'
import VideoSection from '../components/CourseFrom/VideoSection'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const EditLecture = () => {
  const lectures = useSelector((state) => state.courseForm.lectures)
  const { courseId, lectureId } = useParams()
  const lecture = find(lectures, (lec) => lec.id === Number(lectureId))

  const { date, startTime, endTime } = convertLectureDatesStorageToForm({
    startTime: lecture?.startTime,
    endTime: lecture?.endTime,
  })

  const methods = useForm({
    defaultValues: {
      videoUrl: lecture?.materials?.videoUrl,
      title: lecture?.title,
      description: lecture?.description,
      price: lecture?.price,
      date: date,
      startTime: startTime,
      endTime: endTime,
      richText: lecture?.materials?.richText,
    },
  })

  const {
    lectureEvaluation,
    handleRemoveQuestionAnswer,
    handleSetQuestionAnswer,
    handleRemoveQuestion,
    handleRemoveOption,
    handleAddQuestion,
    handleAddOption,
  } = useLectureEvaluationFromControls(lecture?.materials?.evaluation)

  const onSubmit = () => {}

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ pb: 5 }}>
          <Box>
            <Button
              startIcon={<ArrowBackIcon />}
              to={`/dashboard/course/edit/${courseId}`}
              component={Link}
              variant="outlined"
            >
              Back
            </Button>
          </Box>
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

export default EditLecture

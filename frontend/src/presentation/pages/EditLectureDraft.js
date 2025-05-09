import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { find } from 'lodash'
import { FormProvider, useForm } from 'react-hook-form'

import { Box, Button, Stack } from '@mui/material'
import useLectureEvaluationFromControls from '../../hooks/useLectureEvaluationFromControls'
import { editLecture } from '../../state/reducers/courseForm'
import { convertLectureDatesFormToStorage, convertLectureDatesStorageToForm } from '../../utils/lectureDates'
import GeneralLectureInputSection from '../components/CourseFrom/GeneralLectureInputSection'
import LectureDetailsInputSection from '../components/CourseFrom/LectureDetailsInputSection'
import LectureMaterialSection from '../components/CourseFrom/LectureMaterialSection'
import PeopleSection from '../components/CourseFrom/PeopleSection'
import SubmitSection from '../components/CourseFrom/SubmitSection'
import TestSection from '../components/CourseFrom/TestSection'
import VideoSection from '../components/CourseFrom/VideoSection'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const EditLectureDraft = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const lectures = useSelector((state) => state.courseForm.lectures)
  const lecture = find(lectures, (lecture) => lecture.id === id)

  const {
    lectureEvaluation,
    handleRemoveQuestionAnswer,
    handleSetQuestionAnswer,
    handleRemoveQuestion,
    handleRemoveOption,
    handleAddQuestion,
    handleAddOption,
  } = useLectureEvaluationFromControls(lecture?.materials?.evaluation)

  const { date, startHour, endHour } = convertLectureDatesStorageToForm({
    startHour: lecture?.startHour,
    endHour: lecture?.endHour,
  })

  const methods = useForm({
    defaultValues: {
      embeddedVideo: '',
      title: lecture?.title,
      description: lecture?.description,
      price: lecture?.price,
      date: date,
      startHour: startHour,
      endHour: endHour,
      richText: {
        uk: '',
        en: '',
      },
    },
  })

  const onSubmit = (data) => {
    const { startHour, endHour } = convertLectureDatesFormToStorage({
      date: data.date,
      startHour: data.startHour,
      endHour: data.endHour,
    })

    const lecture = {
      title: data.title,
      description: data.description,
      price: data.price,
      startHour: startHour,
      endHour: endHour,
      materials: {
        embeddedVideo: '',
        richText: '',
        evaluation: lectureEvaluation,
      },
    }

    dispatch(editLecture({ lectureId: id, lecture }))
    navigate('/dashboard/course/new')
  }

  useEffect(() => {
    if (!lecture) {
      navigate('/dashboard/course/new')
    }
  }, [lecture])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ pb: 5 }}>
          <Box>
            <Button startIcon={<ArrowBackIcon />} to="/dashboard/course/new" component={Link} variant="outlined">
              Back
            </Button>
          </Box>
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

export default EditLectureDraft

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { find } from 'lodash'
import { FormProvider, useForm } from 'react-hook-form'

import { Box, Button, Stack } from '@mui/material'
import useLectureEvaluationFromControls from '../../hooks/useLectureEvaluationFromControls'
import { useGetCourseByIdMutation } from '../../state/asynchronous'
import {
  editLecture,
  setBprCertificate,
  setBprEvaluation,
  setDescription,
  setId,
  setIsActive,
  setLectures,
  setParticipationCertificate,
  setTitle,
} from '../../state/reducers/courseForm'
import { convertLectureDatesFormToStorage, convertLectureDatesStorageToForm } from '../../utils/lectureDates'
import GeneralLectureInputSection from '../components/CourseFrom/GeneralLectureInputSection'
import LectureDetailsInputSection from '../components/CourseFrom/LectureDetailsInputSection'
import LectureMaterialSection from '../components/CourseFrom/LectureMaterialSection'
import PeopleSection from '../components/CourseFrom/PeopleSection'
import SubmitSection from '../components/CourseFrom/SubmitSection'
import TestSection from '../components/CourseFrom/TestSection'
import VideoSection from '../components/CourseFrom/VideoSection'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const EditLecture = () => {
  const [getCourseById, { isLoading, data }] = useGetCourseByIdMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const lectures = useSelector((state) => state.courseForm.lectures)
  const { courseId, lectureId } = useParams()
  const lecture = find(lectures, (lec) => lec.id === Number(lectureId))

  const methods = useForm({
    defaultValues: {
      videoUrl: '',
      title: '',
      description: '',
      price: '',
      date: '',
      users: [],
      startTime: '',
      endTime: '',
      richText: '',
    },
  })

  const oldEvaluation = lecture?.materials?.evaluation ?? []

  const {
    lectureEvaluation,
    handleRemoveQuestionAnswer,
    handleSetQuestionAnswer,
    handleRemoveQuestion,
    setLectureEvaluation,
    handleRemoveOption,
    handleAddQuestion,
    handleAddOption,
  } = useLectureEvaluationFromControls(oldEvaluation)

  const onSubmit = (data) => {
    const { startTime, endTime } = convertLectureDatesFormToStorage({
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
    })

    const lectureData = {
      id: Number(lectureId),
      title: data.title,
      description: data.description,
      price: data.price,
      startTime: startTime,
      endTime: endTime,
      users: data.users,
      materials: {
        id: lecture?.materials?.id,
        videoUrl: data.videoUrl,
        richText: data.richText,
        evaluation: lectureEvaluation,
      },
    }

    dispatch(editLecture({ lectureId: Number(lectureId), lecture: lectureData }))
    navigate(`/dashboard/course/edit/${courseId}`)
  }

  useEffect(() => {
    if (!lecture) {
      getCourseById(courseId)
      return
    }

    setLectureEvaluation(oldEvaluation)

    const { date, startTime, endTime } = convertLectureDatesStorageToForm({
      startTime: lecture?.startTime,
      endTime: lecture?.endTime,
    })

    methods.setValue('videoUrl', lecture?.materials?.videoUrl)
    methods.setValue('title', lecture?.title)
    methods.setValue('description', lecture?.description)
    methods.setValue('price', lecture?.price)
    methods.setValue('date', date)
    methods.setValue('startTime', startTime)
    methods.setValue('endTime', endTime)
    methods.setValue('richText', lecture?.materials?.richText)
    methods.setValue('users', lecture?.users)
  }, [lecture])

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
  }, [data])

  if (isLoading) {
    return 'Loading...'
  }

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

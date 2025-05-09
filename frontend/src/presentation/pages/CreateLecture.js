import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Box, Button, Stack } from '@mui/material'
import GeneralLectureInputSection from '../components/CourseFrom/GeneralLectureInputSection'
import LectureDetailsInputSection from '../components/CourseFrom/LectureDetailsInputSection'
import LectureMaterialSection from '../components/CourseFrom/LectureMaterialSection'
import PeopleSection from '../components/CourseFrom/PeopleSection'
import SubmitSection from '../components/CourseFrom/SubmitSection'
import TestSection from '../components/CourseFrom/TestSection'
import VideoSection from '../components/CourseFrom/VideoSection'

const CreateLecture = () => {
  const methods = useForm({
    defaultValues: {
      thumbnail: '',
      title: '',
      description: '',
      active: false,
      participationCertificate: '',
      bprCertificate: '',
      bprEvaluation: [],
      students: [],
      lectures: [],
    },
  })

  const onSubmit = (data) => {
    console.log({ data })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ pb: 5 }}>
          <Box>
            <Button variant="outlined">Back</Button>
          </Box>
          <VideoSection />
          <GeneralLectureInputSection />
          <LectureDetailsInputSection />
          <PeopleSection />
          <PeopleSection />
          <LectureMaterialSection />
          <TestSection />
          <SubmitSection />
        </Stack>
      </form>
    </FormProvider>
  )
}

export default CreateLecture

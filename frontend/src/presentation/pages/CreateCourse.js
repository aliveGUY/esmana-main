import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Stack } from '@mui/material'
import CertificatesSection from '../components/CourseFrom/CertificatesSection'
import GeneralInputSection from '../components/CourseFrom/GeneralInputSection'
import ImageInputSection from '../components/CourseFrom/ImageInputSection'
import LecturesSection from '../components/CourseFrom/LecturesSection'
import PeopleSection from '../components/CourseFrom/PeopleSection'
import SubmitSection from '../components/CourseFrom/SubmitSection'
import TestSection from '../components/CourseFrom/TestSection'

const CreateCourse = () => {
  const methods = useForm({
    defaultValues: {
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
          <ImageInputSection />
          <GeneralInputSection />
          <LecturesSection />
          <PeopleSection />
          <CertificatesSection />
          <TestSection />
          <SubmitSection />
        </Stack>
      </form>
    </FormProvider>
  )
}

export default CreateCourse

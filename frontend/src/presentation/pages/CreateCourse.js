import React from 'react'

import { Stack } from '@mui/material'
import CertificatesSection from '../components/CourseFrom/CertificatesSection'
import GeneralInputSection from '../components/CourseFrom/GeneralInputSection'
import ImageInputSection from '../components/CourseFrom/ImageInputSection'
import LecturesSection from '../components/CourseFrom/LecturesSection'
import PeopleSection from '../components/CourseFrom/PeopleSection'
import SubmitSection from '../components/CourseFrom/SubmitSection'
import TestSection from '../components/CourseFrom/TestSection'

const CreateCourse = () => {
  return (
    <Stack spacing={2}>
      <ImageInputSection />
      <GeneralInputSection />
      <LecturesSection />
      <PeopleSection />
      <CertificatesSection />
      <TestSection />
      <SubmitSection />
    </Stack>
  )
}

export default CreateCourse

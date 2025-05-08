import { Button, Stack } from '@mui/material'
import React from 'react'
import GeneralInputSection from '../components/CourseFrom/GeneralInputSection'
import PeopleSection from '../components/CourseFrom/PeopleSection'
import TestSection from '../components/CourseFrom/TestSection'
import SubmitSection from '../components/CourseFrom/SubmitSection'

const CreateLecture = () => {
  return (
    <Stack spacing={2}>
      <Button variant="outlined">Back</Button>
      <GeneralInputSection />
      <PeopleSection />
      <PeopleSection />
      <TestSection />
      <SubmitSection />
    </Stack>
  )
}

export default CreateLecture

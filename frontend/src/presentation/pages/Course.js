import { Button, Stack } from '@mui/material'
import React from 'react'
import LectureNavigation from '../components/LectureNavigation'
import LectureContent from '../components/LectureContent'

const Course = () => {
  return (
    <Stack>
      <Stack direction="row">
        <Button variant="outlined">Back</Button>
      </Stack>
      <Stack direction="row">
        <LectureNavigation />
        <LectureContent />
      </Stack>
    </Stack>
  )
}

export default Course

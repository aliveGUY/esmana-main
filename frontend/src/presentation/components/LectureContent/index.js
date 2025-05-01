import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { find } from 'lodash'

import { Box, Button, Stack, Typography } from '@mui/material'

const LectureContent = () => {
  const { lectureId, courseId } = useParams()
  const { ownedCourses } = useSelector((state) => state.courses)
  const { lectures } = ownedCourses[courseId]
  const { description, title, materials } = find(lectures, (lecture) => lecture.id === Number(lectureId))

  return (
    <Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: 'snowFog.main',
          height: 140,
          borderRadius: '24px',
        }}
      >
        <Typography color="stormWave.main" fontWeight="bold">
          No Video is Available
        </Typography>
      </Stack>
      <Stack direction="row">
        <Box width="100%">
          <Typography fontWeight="bold">{title}</Typography>
          <Typography>{description}</Typography>
        </Box>
        <Box>
          <Typography>Meeting will start at 12.04.2025 14:00</Typography>
          <Button variant="primary">Join Lecture</Button>
        </Box>
      </Stack>
    </Stack>
  )
}

export default LectureContent

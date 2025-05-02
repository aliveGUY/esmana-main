import React from 'react'
import { useSelector } from 'react-redux'
import { find } from 'lodash'
import { useParams } from 'react-router'
import { Link } from 'react-router'

import { Box, Button } from '@mui/material'
import SectionWrapper from '../common/SectionWrapper'
import LectureContent from '../components/LectureContent'
import LectureNavigation from '../components/LectureNavigation'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Course = () => {
  const { lectureId, courseId } = useParams()
  const { ownedCourses } = useSelector((state) => state.courses)
  const { lectures } = ownedCourses[courseId]
  const lecture = find(lectures, (lecture) => lecture.id === Number(lectureId))
  return (
    <SectionWrapper>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gridTemplateRows: 'auto 1fr',
          gap: 2,
          height: '100%',
        }}
      >
        <Box
          sx={{
            gridColumn: '1 / -1',
          }}
        >
          <Button startIcon={<ArrowBackIcon />} to="/dashboard/courses" component={Link} variant="outlined">
            Back
          </Button>
        </Box>
        <LectureNavigation lectures={lectures} />
        <LectureContent lecture={lecture} />
      </Box>
    </SectionWrapper>
  )
}

export default Course

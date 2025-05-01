import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router'

import { Box, Button } from '@mui/material'
import SectionWrapper from '../common/SectionWrapper'
import LectureContent from '../components/LectureContent'
import LectureNavigation from '../components/LectureNavigation'

const Course = () => {
  const { courseId } = useParams()
  const { ownedCourses } = useSelector((state) => state.courses)
  const { lectures } = ownedCourses[courseId]

  return (
    <SectionWrapper>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: 2,
        }}
      >
        <Box
          sx={{
            gridColumn: '1 / -1',
          }}
        >
          <Button to="/dashboard/courses" component={Link} variant="outlined">
            Back
          </Button>
        </Box>
        <LectureNavigation lectures={lectures} />
        <LectureContent />
      </Box>
    </SectionWrapper>
  )
}

export default Course

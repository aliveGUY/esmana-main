import React from 'react'
import { useSelector } from 'react-redux'
import { find } from 'lodash'
import { useParams } from 'react-router'

import { Box } from '@mui/material'
import SectionWrapper from '../common/SectionWrapper'
import LectureContent from '../components/LectureContent'
import LectureNavigation from '../components/LectureNavigation'
import LectureTopControls from '../components/LectureTopControls'

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
          gridTemplateColumns: { xs: '1fr', md: '300px 1fr' },
          gridTemplateRows: { xs: 'auto auto 1fr', md: 'auto 1fr' },
          gap: 2,
          height: '100%',
          px: 2,
        }}
      >
        <Box sx={{ gridColumn: '1 / -1' }} pt={2}>
          <LectureTopControls lecture={lecture} />
        </Box>
        <LectureNavigation lectures={lectures} />
        <LectureContent lecture={lecture} />
      </Box>
    </SectionWrapper>
  )
}

export default Course

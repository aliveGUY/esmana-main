import React from 'react'
import { find } from 'lodash'
import { useParams } from 'react-router'

import { Box } from '@mui/material'
import SectionWrapper from '../common/SectionWrapper'
import LectureContent from '../components/LectureContent'
import LectureNavigation from '../components/LectureNavigation'
import LectureTopControls from '../components/LectureTopControls'
import { useGetCourseByIdQuery } from '../../state/asynchronous'
import { useCourses } from '../../hooks/useCourses'

const Course = () => {
  const { lectureId, courseId } = useParams()
  const { ownedCourses } = useCourses()
  useGetCourseByIdQuery(courseId)

  if (!ownedCourses) return

  const course = find(ownedCourses, (course) => course.id === Number(courseId))
  const lecture = find(course.lectures, (lecture) => lecture.id === Number(lectureId))

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
        <LectureNavigation lectures={course.lectures} />
        <LectureContent lecture={lecture} />
      </Box>
    </SectionWrapper>
  )
}

export default Course

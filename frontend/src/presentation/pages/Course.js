import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { find, head, isEmpty, last, sortBy } from 'lodash'
import { useParams } from 'react-router'

import { Box } from '@mui/material'
import { useCourses } from '../../hooks/useCourses'
import { useGetCourseByIdMutation } from '../../state/asynchronous'
import SectionWrapper from '../common/SectionWrapper'
import LectureContent from '../components/LectureContent'
import LectureNavigation from '../components/LectureNavigation'
import LectureTopControls from '../components/LectureTopControls'

const Course = () => {
  const { lectureId, courseId } = useParams()
  const { ownedCourses } = useCourses()
  const [getCourseById] = useGetCourseByIdMutation()

  useEffect(() => {
    getCourseById(courseId)
  }, [])

  if (!ownedCourses || isEmpty(ownedCourses)) return

  const course = find(ownedCourses, (course) => course.id === Number(courseId))
  const lecture = find(course.lectures, (lecture) => lecture.id === Number(lectureId))
  const sortedLectures = sortBy(course.lectures, (item) => dayjs(item?.startTime).valueOf())
  const isFirstLecture = head(sortedLectures).id === Number(lectureId)
  const isLastLecture = last(sortedLectures).id === Number(lectureId)

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
        <LectureNavigation lectures={sortedLectures} />
        <LectureContent lecture={lecture} isFirstLecture={isFirstLecture} isLastLecture={isLastLecture} />
      </Box>
    </SectionWrapper>
  )
}

export default Course

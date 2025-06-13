import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { filter, find, head, isEmpty, last, map, some, sortBy } from 'lodash'
import { useNavigate, useParams } from 'react-router'

import { Box } from '@mui/material'
import { useCourses } from '../../hooks/useCourses'
import { useGetCourseByIdMutation } from '../../state/asynchronous'
import SectionWrapper from '../common/SectionWrapper'
import LectureContent from '../components/LectureContent'
import LectureNavigation from '../components/LectureNavigation'
import LectureTopControls from '../components/LectureTopControls'
import { useAuth } from '../../hooks/useAuth'

const getBlockedLectures = (lectures, user) => {
  const firstIncompleteLecture = find(lectures, (lecture) => !lecture.isCompleted)

  const incompleteLectures = filter(lectures, (lecture) => {
    const isPurchased = some(lecture.users, (userLecture) => userLecture.user.id === user?.id)
    return isPurchased && !lecture.isCompleted && lecture.id !== firstIncompleteLecture?.id
  })

  return map(incompleteLectures, 'id')
}

const Course = () => {
  const { user } = useAuth()
  const { lectureId, courseId } = useParams()
  const { ownedCourses } = useCourses()
  const [getCourseById] = useGetCourseByIdMutation()
  const navigate = useNavigate()

  useEffect(() => {
    getCourseById(courseId)
  }, [])

  useEffect(() => {
    const course = find(ownedCourses, (course) => course.id === Number(courseId))
    if (!course) return
    
    const sortedLectures = sortBy(course.lectures, (item) => dayjs(item?.startTime).valueOf())
    const blockedLectures = getBlockedLectures(sortedLectures, user)
    const shouldRedirect = blockedLectures.includes(Number(lectureId))

    if (shouldRedirect) {
      const firstIncompleteLecture = find(sortedLectures, (lecture) => !lecture.isCompleted)
      navigate(`/dashboard/course/${courseId}/${firstIncompleteLecture.id}`)
    }
  }, [lectureId, ownedCourses])

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

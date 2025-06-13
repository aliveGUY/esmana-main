import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useNavigate, useParams } from 'react-router'

import { Box } from '@mui/material'
import { useCourses } from '../../hooks/useCourses'
import { useGetCourseByIdMutation } from '../../state/asynchronous'
import SectionWrapper from '../common/SectionWrapper'
import LectureContent from '../components/LectureContent'
import LectureNavigation from '../components/LectureNavigation'
import LectureTopControls from '../components/LectureTopControls'

const Course = () => {
  const { lectureId, courseId } = useParams()
  const {
    ownedCourses,
    blockedLectureIds,
    firstIncompleteLectureId,
    sortedLectures,
    isFirstLecture,
    isLastLecture,
    currentLecture,
  } = useCourses()
  const [getCourseById] = useGetCourseByIdMutation()
  const navigate = useNavigate()

  useEffect(() => {
    getCourseById(courseId)
  }, [])

  useEffect(() => {
    const shouldRedirect = blockedLectureIds.includes(Number(lectureId))

    if (shouldRedirect && firstIncompleteLectureId) {
      navigate(`/dashboard/course/${courseId}/${firstIncompleteLectureId}`)
    }
  }, [blockedLectureIds, firstIncompleteLectureId])

  if (!ownedCourses || isEmpty(ownedCourses)) return

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
          <LectureTopControls lecture={currentLecture} />
        </Box>
        <LectureNavigation lectures={sortedLectures} />
        <LectureContent lecture={currentLecture} isFirstLecture={isFirstLecture} isLastLecture={isLastLecture} />
      </Box>
    </SectionWrapper>
  )
}

export default Course

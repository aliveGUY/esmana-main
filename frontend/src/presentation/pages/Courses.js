import React from 'react'
import { useNavigate } from 'react-router-dom'
import { map } from 'lodash'

import { Box, Grid2, Paper, Stack } from '@mui/material'
import { useCourses } from '../../hooks/useCourses'
import { useGetAllCoursesQuery } from '../../state/asynchronous'
import SectionWrapper from '../common/SectionWrapper'
import CourseCard from '../components/CourseCard'
import OwnedCourseCard from '../components/OwnedCourseCard'
import ScheduleCalendar from '../components/ScheduleCalendar'
import ScheduleList from '../components/ScheduleList'
import SearchHeader from '../components/SearchHeader'

const Courses = () => {
  useGetAllCoursesQuery()
  const { ownedCourses, availableCourses } = useCourses()
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/dashboard/course/new')
  }

  return (
    <Stack>
      <SearchHeader title="Courses" buttonText="Create Course" onPrimaryActionClick={handleRedirect} />
      <Stack sx={{ px: 3 }} spacing={3}>
        {ownedCourses && (
          <SectionWrapper>
            <Paper sx={{ p: 3 }}>
              <Stack direction="row">
                <ScheduleList />
                <ScheduleCalendar />
              </Stack>
            </Paper>
          </SectionWrapper>
        )}

        <SectionWrapper>
          <Box pb={10}>
            <Grid2 container spacing={2}>
              {map(ownedCourses, (course, index) => (
                <OwnedCourseCard key={index} course={course} />
              ))}
              {map(availableCourses, (course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </Grid2>
          </Box>
        </SectionWrapper>
      </Stack>
    </Stack>
  )
}

export default Courses

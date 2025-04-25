import React from 'react'
import { useSelector } from 'react-redux'
import { map } from 'lodash'

import { Box, Grid2, Paper, Stack } from '@mui/material'
import SectionWrapper from '../common/SectionWrapper'
import CourseCard from '../components/CourseCard'
import OwnedCourseCard from '../components/OwnedCourseCard'
import ScheduleCalendar from '../components/ScheduleCalendar'
import ScheduleList from '../components/ScheduleList'
import SearchHeader from '../components/SearchHeader'

const Courses = () => {
  const { ownedCourses, availableCourses } = useSelector((state) => state.courses)

  return (
    <Stack>
      <SearchHeader title="Courses" />
      <Stack sx={{ px: 3 }} spacing={2}>
        <SectionWrapper>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row">
              <ScheduleList />
              <ScheduleCalendar />
            </Stack>
          </Paper>
        </SectionWrapper>

        <SectionWrapper>
          <Box pb={10}>
            <Grid2 container spacing={3}>
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

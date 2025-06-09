import React from 'react'
import { useSelector } from 'react-redux'
import { concat, map, sortBy } from 'lodash'

import { Box, Stack, Typography } from '@mui/material'
import { useCourses } from '../../hooks/useCourses'
import { useFormattedDates } from '../../hooks/useFormattedDates'

const LectureItem = ({ lecture }) => {
  const { description, title, startTime, owned } = lecture

  const { date, hoursStart } = useFormattedDates({ startTime })

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box>
        <Typography color={owned ? 'black' : 'ternary.main'} fontWeight="bold" textAlign="right">
          {hoursStart}
        </Typography>
        <Typography color={owned ? 'stormWave.main' : 'ternary.main'} textAlign="right" whiteSpace="nowrap">
          {date}
        </Typography>
      </Box>
      <Box>
        <Typography color={owned ? 'black' : 'ternary.main'} fontWeight="bold">
          {title}
        </Typography>
        <Typography color={owned ? 'stormWave.main' : 'ternary.main'}>{description}</Typography>
      </Box>
    </Stack>
  )
}

const ScheduleList = () => {
  const { highlightedCourse = [] } = useSelector((state) => state.courses)
  const { ownedCourses } = useCourses()

  const ownedLectures = ownedCourses
    .flatMap((course) => course.lectures)
    .map((lecture) => ({
      ...lecture,
      owned: true,
    }))

  const highlightedLectures = highlightedCourse
    ? highlightedCourse.lectures.map((lecture) => ({
        ...lecture,
        owned: false,
      }))
    : []

  const lectures = sortBy(concat(ownedLectures, highlightedLectures), (item) => new Date(item?.startTime))

  return (
    <Stack
      flex={1}
      spacing={3}
      sx={{
        maxHeight: 400,
        overflow: 'auto',
      }}
    >
      <Typography fontWeight="bold" mb={2}>
        Your Events
      </Typography>
      {map(lectures, (lecture, index) => (
        <LectureItem ley={index} lecture={lecture} />
      ))}
    </Stack>
  )
}

export default ScheduleList

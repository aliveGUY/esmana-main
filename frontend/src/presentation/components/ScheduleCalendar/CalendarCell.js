import React from 'react'
import dayjs from 'dayjs'
import { map } from 'lodash'

import { Box, useTheme } from '@mui/material'

const monthNameToIndex = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
}

const parseLectures = (lectures, cellDate) => {
  if (!lectures) return []

  return lectures
    .map((lecture) => {
      const start = dayjs(lecture.startTime)
      const end = dayjs(lecture.endTime)

      const isMatchingDate = cellDate.isSame(start, 'date')
      const isMatchingDay = cellDate.day() === start.day()

      if (!isMatchingDate || !isMatchingDay) return null

      const isInCell =
        (cellDate.isAfter(start) && cellDate.isBefore(end)) || cellDate.isSame(start) || cellDate.isSame(end)

      const isFirstCell = cellDate.isSame(start)
      const isLastCell = cellDate.isSame(end)

      return isInCell
        ? {
            ...lecture,
            isFirstCell,
            isLastCell,
          }
        : null
    })
    .filter(Boolean)
}

const HighlightedLectureFactory = ({ event }) => {
  const theme = useTheme()
  const { isLastCell, isFirstCell } = event
  let borderRadius = 0
  let borderTop = null
  let borderBottom = null
  const borderStyle = `2px dashed ${theme.palette.ternary.main}`

  if (isFirstCell) {
    borderRadius = '99px 99px 0 0'
    borderTop = borderStyle
  }

  if (isLastCell) {
    borderBottom = borderStyle
    borderRadius = '0 0 99px 99px'
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.ternary.light,
        borderLeft: borderStyle,
        borderRight: borderStyle,
        borderTop,
        borderBottom,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 4,
        right: 4,
        borderRadius,
      }}
    />
  )
}

const OwnedLectureFactory = ({ event }) => {
  const theme = useTheme()
  const { isLastCell, isFirstCell } = event
  let borderRadius = 0

  if (isFirstCell) {
    borderRadius = '99px 99px 0 0'
  }

  if (isLastCell) {
    borderRadius = '0 0 99px 99px'
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.stormWave.main + '50', // 80% opacity
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 4,
        right: 4,
        borderRadius,
      }}
    />
  )
}
const CalendarCell = ({ day, hour, ownedCourses, highlightedCourse }) => {
  const monthIndex = monthNameToIndex[day.month]

  const [parsedHour, parsedMinutes] = hour.split(':').map(Number)

  const cellDate = dayjs()
    .set('year', day.year)
    .set('month', monthIndex)
    .set('date', day.date)
    .set('hour', parsedHour)
    .set('minute', parsedMinutes)
    .set('second', 0)
    .set('millisecond', 0)

  const lecturesInHour = parseLectures(
    ownedCourses?.flatMap((course) => course.lectures),
    cellDate,
  )

  const highlightedLectures = parseLectures(highlightedCourse?.lectures, cellDate)

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      {map(highlightedLectures, (event, index) => (
        <HighlightedLectureFactory key={index} event={event} />
      ))}
      {map(lecturesInHour, (event, index) => (
        <OwnedLectureFactory key={index} event={event} />
      ))}
    </Box>
  )
}

export default CalendarCell

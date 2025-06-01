import React from 'react'
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
      const start = new Date(lecture.startTime)
      const end = new Date(lecture.endTime)

      const isMatchingDate = cellDate.getDate() === start.getDate()
      const isMatchingDay = cellDate.getDay() === start.getDay()
      if (!isMatchingDate || !isMatchingDay) return null

      const isInCell = start <= cellDate && end >= cellDate

      const isFirstCell = cellDate.getTime() === start.getTime()
      const isLastCell = cellDate.getTime() === end.getTime()

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

  const parsedHour = parseInt(hour.split(':')[0], 10)
  const parsedMinutes = parseInt(hour.split(':')[1], 10)

  const cellDate = new Date(day.year, monthIndex, day.date, parsedHour, parsedMinutes, 0, 0)

  const lecturesInHour = parseLectures(
    ownedCourses?.flatMap((course) => course.lectures),
    cellDate,
  )

  const highlightedLectures = parseLectures(highlightedCourse?.lectures, cellDate)

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
      }}
    >
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

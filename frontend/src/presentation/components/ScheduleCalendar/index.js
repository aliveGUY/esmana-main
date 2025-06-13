import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { map } from 'lodash'

import { Box, IconButton, Stack, Typography } from '@mui/material'
import { HOURS, MONTHS, WEEK } from '../../../constants/calendar'
import { useCourses } from '../../../hooks/useCourses'
import CalendarHeader from './CalendarHeader'
import CalendarRow from './CalendarRow'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

function getWeekFromDate(inputDate) {
  const date = dayjs(inputDate)
  const dayIndex = date.day()

  const weekStart = date.subtract(dayIndex, 'day')

  const week = []

  for (let i = 0; i < 7; i++) {
    const current = weekStart.add(i, 'day')
    week.push({
      day: WEEK[current.day()],
      date: current.date(),
      month: MONTHS[current.month()],
      year: current.year(),
    })
  }

  return week
}

const ScheduleCalendar = () => {
  const [anchorDate, setAnchorDate] = useState(dayjs())
  const week = getWeekFromDate(anchorDate)
  const month = MONTHS[anchorDate.month()]
  const calendarRef = useRef()

  const { highlightedCourse } = useSelector((state) => state.courses)
  const { ownedCourses } = useCourses()

  const swipeRight = () => {
    setAnchorDate((prev) => prev.add(7, 'day'))
  }

  const swipeLeft = () => {
    setAnchorDate((prev) => prev.subtract(7, 'day'))
  }

  useEffect(() => {
    if (!calendarRef.current) return
    const currentTime = dayjs()
    const currentHour = currentTime.hour()
    const currentMinutes = currentTime.minute() >= 30 ? '30' : '00'

    const targetElement = calendarRef.current.querySelector(`#hour${currentHour}-${currentMinutes}`)
    if (targetElement) {
      targetElement.scrollIntoView({ block: 'center' })
    }
  }, [calendarRef])

  return (
    <Box sx={{ maxWidth: 400, display: { xs: 'none', md: 'block' } }}>
      <Stack direction="row">
        <Stack direction="row" spacing={1}>
          <IconButton onClick={swipeLeft}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={swipeRight}>
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
        <Typography flex={1} textAlign="center">
          {month}
        </Typography>
      </Stack>
      <Box
        ref={calendarRef}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          maxHeight: 400,
          overflow: 'auto',
        }}
      >
        <CalendarHeader week={week} />
        {map(HOURS, (hour, index) => (
          <CalendarRow
            key={index}
            hour={hour}
            week={week}
            ownedCourses={ownedCourses}
            highlightedCourse={highlightedCourse}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ScheduleCalendar

import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { map } from 'lodash'

import { Box, IconButton, Stack, Typography } from '@mui/material'
import { HOURS, MONTHS, WEEK } from '../../../constants/calendar'
import { useCourses } from '../../../hooks/useCourses'
import CalendarHeader from './CalendarHeader'
import CalendarRow from './CalendarRow'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

function getWeekFromDate(inputDate) {
  const date = new Date(inputDate)
  const dayIndex = date.getDay()

  const weekStart = new Date(date)
  weekStart.setDate(date.getDate() - dayIndex)

  const week = []

  for (let i = 0; i < 7; i++) {
    const current = new Date(weekStart)
    current.setDate(weekStart.getDate() + i)

    week.push({
      day: WEEK[current.getDay()],
      date: current.getDate(),
      month: MONTHS[current.getMonth()],
      year: current.getFullYear(),
    })
  }

  return week
}

const ScheduleCalendar = () => {
  const [anchorDate, setAnchorDate] = useState(new Date())
  const week = getWeekFromDate(anchorDate)
  const month = MONTHS[anchorDate.getMonth()]
  const calendarRef = useRef()

  const { highlightedCourse } = useSelector((state) => state.courses)
  const { ownedCourses } = useCourses()

  const swipeRight = () => {
    setAnchorDate((prev) => {
      const nextDate = new Date(prev)
      nextDate.setDate(nextDate.getDate() + 7)
      return nextDate
    })
  }

  const swipeLeft = () => {
    setAnchorDate((prev) => {
      const prevDate = new Date(prev)
      prevDate.setDate(prevDate.getDate() - 7)
      return prevDate
    })
  }

  useEffect(() => {
    if (!calendarRef.current) return
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const currentMinutes = currentTime.getMinutes() / 30 > 0 ? '00' : '30'

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

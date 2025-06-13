import React, { Fragment } from 'react'
import dayjs from 'dayjs'
import { map } from 'lodash'

import { Box, Stack, Typography } from '@mui/material'
import { WEEK } from '../../../constants/calendar'

const CalendarHeader = ({ week }) => {
  const today = dayjs()
  const _day = WEEK[today.day()]
  const _date = today.date()

  const isToday = (day, date) => {
    return day === _day && date === _date
  }

  return (
    <Fragment>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          borderBottom: '1px solid #4F8096',
          zIndex: 1,
        }}
      ></Box>
      {map(week, ({ day, date }, index) => (
        <Stack
          key={index}
          alignItems="center"
          spacing={1}
          sx={{
            borderLeft: '1px solid #4F8096',
            borderBottom: '1px solid #4F8096',
            pt: 2,
            pb: 1,
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 1,
          }}
        >
          <Typography fontSize={14} color="stormWave.main">
            {day}
          </Typography>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 24,
              height: 24,
              backgroundColor: isToday(day, date) ? '#FE00003C' : 'white',
              borderRadius: 99,
            }}
          >
            <Typography fontSize={14}>{date}</Typography>
          </Stack>
        </Stack>
      ))}
    </Fragment>
  )
}

export default CalendarHeader

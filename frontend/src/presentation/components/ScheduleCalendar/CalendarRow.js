import React, { Fragment } from 'react'
import { map } from 'lodash'

import { Box, Stack } from '@mui/material'
import CalendarCell from './CalendarCell'

const CalendarRow = ({ hour, week, ownedCourses, highlightedCourse }) => {
  return (
    <Fragment>
      <Stack
        id={`hour${hour.replace(':', '-')}`}
        justifyContent="center"
        alignItems="center"
        sx={{
          p: 1,
          borderTop: '1px solid #4F8096',
        }}
      >
        {hour}
      </Stack>
      {map(week, (day, index) => (
        <Box
          key={index}
          sx={{
            borderTop: '1px solid #4F8096',
            borderLeft: '1px solid #4F8096',
          }}
        >
          <CalendarCell day={day} hour={hour} ownedCourses={ownedCourses} highlightedCourse={highlightedCourse} />
        </Box>
      ))}
    </Fragment>
  )
}

export default CalendarRow

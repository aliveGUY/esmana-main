import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { isEmpty, map } from 'lodash'

import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { convertLectureDatesStorageToInterface } from '../../../utils/lectureDates'
import SectionWrapper from '../../common/SectionWrapper'

const LectureItem = ({ lecture }) => {
  const { date, startHour, endHour } = convertLectureDatesStorageToInterface({
    startHour: lecture.startHour,
    endHour: lecture.endHour,
  })

  return (
    <Stack direction="row" sx={{ p: 1 }} justifyContent="space-between" alignItems="center">
      <Box>
        <Typography>{lecture.title}</Typography>
        <Stack direction="row" spacing={2}>
          <Typography color="stormWave.main" lineHeight="normal">
            {date}
          </Typography>
          <Typography color="stormWave.main" lineHeight="normal">
            {startHour} - {endHour}
          </Typography>
        </Stack>
      </Box>
      <Button variant="outlined" component={Link} to={`/dashboard/course/new/lecture/${lecture.id}`}>
        Edit
      </Button>
    </Stack>
  )
}

const LecturesSection = ({ data = [] }) => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack sx={{ p: 2 }} spacing={2}>
            <Stack justifyContent="space-between" direction="row">
              <Typography fontWeight="bold">Lectures</Typography>
              <Button variant="primary" to="/dashboard/course/new/lecture/new" component={Link}>
                Add Lecture
              </Button>
            </Stack>
            <Stack
              sx={{
                border: '1px solid',
                borderColor: 'stormWave.main',
                borderRadius: '12px',
                p: 1,
                'hr:last-of-type': {
                  display: 'none',
                },
              }}
            >
              {isEmpty(data) ? (
                <Typography textAlign="center" fontWeight="bold" color="stormWave.main" py={2}>
                  *empty*
                </Typography>
              ) : (
                map(data, (lecture) => (
                  <Fragment>
                    <LectureItem lecture={lecture} />
                    <Divider sx={{ borderColor: 'stormWave.main', mx: 1 }} />
                  </Fragment>
                ))
              )}
            </Stack>
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}
export default LecturesSection

import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { isEmpty, map } from 'lodash'

import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { useLectures } from '../../../hooks'
import { convertLectureDatesStorageToInterface } from '../../../utils/lectureDates'
import SectionWrapper from '../../common/SectionWrapper'

const LectureItem = ({ lecture, isEdit = false }) => {
  const { courseId } = useParams()
  const { date, startTime, endTime } = convertLectureDatesStorageToInterface({
    startTime: lecture.startTime,
    endTime: lecture.endTime,
  })

  const redirectUrl = isEdit
    ? `/dashboard/course/edit/${courseId}/lecture/${lecture.id}`
    : `/dashboard/course/new/lecture/${lecture.id}`

  return (
    <Stack direction="row" sx={{ p: 1 }} justifyContent="space-between" alignItems="center">
      <Box>
        <Typography>{lecture.title}</Typography>
        <Stack direction="row" spacing={2}>
          <Typography color="stormWave.main" lineHeight="normal">
            {date}
          </Typography>
          <Typography color="stormWave.main" lineHeight="normal">
            {startTime} - {endTime}
          </Typography>
        </Stack>
      </Box>
      <Button variant="outlined" component={Link} to={redirectUrl}>
        Edit
      </Button>
    </Stack>
  )
}

const LecturesSection = ({ isEdit = false }) => {
  const { courseId } = useParams()
  const data = useSelector((state) => state.courseForm.lectures)
  const { sortLectures } = useLectures()
  const sortedLectures = sortLectures(data)

  const redirect = isEdit ? `/dashboard/course/edit/${courseId}/lecture/new` : '/dashboard/course/new/lecture/new'

  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack sx={{ p: 2 }} spacing={2}>
            <Stack justifyContent="space-between" direction="row">
              <Typography fontWeight="bold">Lectures</Typography>
              <Button variant="primary" to={redirect} component={Link}>
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
              {isEmpty(sortedLectures) ? (
                <Typography textAlign="center" fontWeight="bold" color="stormWave.main" py={2}>
                  *empty*
                </Typography>
              ) : (
                map(sortedLectures, (lecture) => (
                  <Fragment>
                    <LectureItem lecture={lecture} isEdit={isEdit} />
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

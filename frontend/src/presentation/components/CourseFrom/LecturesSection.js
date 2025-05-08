import React, { Fragment } from 'react'

import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'
import { Link } from 'react-router-dom'

const LectureItem = () => {
  return (
    <Stack direction="row" sx={{ p: 1 }} justifyContent="space-between" alignItems="center">
      <Box>
        <Typography>Lecture</Typography>
        <Stack direction="row" spacing={2}>
          <Typography color="stormWave.main" lineHeight="normal">
            12.04.2020
          </Typography>
          <Typography color="stormWave.main" lineHeight="normal">
            14:00-15:00
          </Typography>
        </Stack>
      </Box>
      <Button variant="outlined">Edit</Button>
    </Stack>
  )
}

const LecturesSection = () => {
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
              {new Array(5).fill(null).map(() => (
                <Fragment>
                  <LectureItem />
                  <Divider sx={{ borderColor: 'stormWave.main', mx: 1 }} />
                </Fragment>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}
export default LecturesSection

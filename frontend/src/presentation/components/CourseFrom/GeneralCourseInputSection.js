import React from 'react'

import { Box, Paper, Stack, Typography } from '@mui/material'
import Switch from '../../common/inputs/Switch'
import TextField from '../../common/inputs/TextField'
import SectionWrapper from '../../common/SectionWrapper'

const GeneralCourseInputSection = () => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Box p={2}>
            <Stack spacing={2}>
              <TextField name="title" label="Title" />
              <TextField name="description" label="Description" multiline minRows={3} maxRows={30} />
              <Stack justifyContent="space-between" direction="row">
                <Box>
                  <Typography lineHeight="normal">Course is active</Typography>
                  <Typography color="stormWave.main" lineHeight="normal">
                    Indicates if this course is vissible to customers or not
                  </Typography>
                </Box>
                <Switch name="active" />
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default GeneralCourseInputSection

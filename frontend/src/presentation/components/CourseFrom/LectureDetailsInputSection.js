import React from 'react'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

import { Box, Paper, Stack, TextField } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'

const LectureDetailsInputSection = () => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Box p={2}>
            <Stack spacing={2}>
              <TextField name="price" label="Price" />
              <DatePicker label="Basic date picker" />
              <TimePicker label="Basic time picker" />
              <TimePicker label="Basic time picker" />
            </Stack>
          </Box>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default LectureDetailsInputSection

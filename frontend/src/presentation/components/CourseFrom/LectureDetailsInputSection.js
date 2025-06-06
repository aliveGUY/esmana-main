import React from 'react'

import { Box, Paper, Stack } from '@mui/material'
import DatePicker from '../../common/inputs/DatePicker'
import TextField from '../../common/inputs/TextField'
import TimePicker from '../../common/inputs/TimePicker'
import SectionWrapper from '../../common/SectionWrapper'

const LectureDetailsInputSection = () => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Box p={2}>
            <Stack spacing={2}>
              <TextField name="price" label="Price" required="Price is required" />
              <DatePicker name="date" label="Date" required="Date is required" />
              <TimePicker name="startTime" label="Starting hour" required="Starting hour is required" />
              <TimePicker name="endTime" label="Ending hour" required="Ending hour is required" />
            </Stack>
          </Box>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default LectureDetailsInputSection

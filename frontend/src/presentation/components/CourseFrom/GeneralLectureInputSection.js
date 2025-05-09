import React from 'react'

import { Box, Paper, Stack } from '@mui/material'
import TextField from '../../common/inputs/TextField'
import SectionWrapper from '../../common/SectionWrapper'

const GeneralLectureInputSection = () => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Box p={2}>
            <Stack spacing={2}>
              <TextField name="title" label="Title" />
              <TextField name="description" label="Description" multiline minRows={3} maxRows={30} />
            </Stack>
          </Box>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default GeneralLectureInputSection

import React from 'react'

import { Box, Paper, Stack, Switch, TextField, Typography } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'

const GeneralInputSection = () => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Box p={2}>
            <Stack spacing={2}>
              <TextField />
              <TextField multiline minRows={3} maxRows={30} />
              <Stack justifyContent="space-between" direction="row">
                <Box>
                  <Typography lineHeight="normal">Course is active</Typography>
                  <Typography color="stormWave.main" lineHeight="normal">
                    Indicates if this course is vissible to customers or not
                  </Typography>
                </Box>
                <Switch />
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default GeneralInputSection

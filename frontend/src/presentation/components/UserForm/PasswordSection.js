import React from 'react'

import { Box, Paper, Stack } from '@mui/material'
import Password from '../../common/inputs/Password'
import SectionWrapper from '../../common/SectionWrapper'

const PasswordSection = () => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack p={2} spacing={2}>
            <Password name="password" label="Password" />
            <Password name="confirmPassword" label="Confirm Password" />
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default PasswordSection

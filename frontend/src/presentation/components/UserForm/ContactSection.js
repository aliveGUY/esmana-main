import React from 'react'

import { Box, Paper, Stack } from '@mui/material'
import TextField from '../../common/inputs/TextField'
import SectionWrapper from '../../common/SectionWrapper'

const ContactSection = () => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack p={2} spacing={2}>
            <TextField name="firstName" label="First name" required="First name is required" />
            <TextField name="middleName" label="Middle name" />
            <TextField name="lastName" label="Last name" required="Last name is required" />
            <TextField name="phone" label="Phone" />
            <TextField name="email" label="Email" required="Email name is required" />
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default ContactSection

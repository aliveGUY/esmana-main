import React from 'react'

import { Box, Paper, Stack } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'
import TextField from '../../common/inputs/TextField'

const ContactSection = () => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack p={2} spacing={2}>
            <TextField name="firstName" label="First name" />
            <TextField name="middleName" label="Middle name" />
            <TextField name="lastName" label="Last name" />
            <TextField name="phone" label="Phone" />
            <TextField name="email" label="Email" />
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default ContactSection

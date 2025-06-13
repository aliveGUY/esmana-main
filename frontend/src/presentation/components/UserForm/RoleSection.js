import React from 'react'

import { Box, Paper, Stack } from '@mui/material'
import MultiSelect from '../../common/inputs/Select'
import SectionWrapper from '../../common/SectionWrapper'

const RoleSection = () => {
  const names = [
    { text: 'User', value: 'user' },
    { text: 'Admin', value: 'admin' },
  ]

  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack p={2} spacing={2}>
            <MultiSelect name="roles" label="Roles" required="Role is required" options={names} />
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default RoleSection

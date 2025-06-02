import React from 'react'

import { Box, Button, Paper } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'

const PeopleSection = () => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Box p={3}>
            <Button variant="outlined">Add User</Button>
          </Box>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default PeopleSection

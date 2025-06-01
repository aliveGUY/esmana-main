import React from 'react'

import { Box, Button, Checkbox, IconButton, Paper, Stack, Typography } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'

import MoreVertIcon from '@mui/icons-material/MoreVert'

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

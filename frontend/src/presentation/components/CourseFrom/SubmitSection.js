import React from 'react'

import { Box, Button, Paper, Stack } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'

const SubmitSection = ({ isLoading = false }) => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack p={2} direction="row" justifyContent="end" spacing={2} disabled={isLoading}>
            <Button type="button" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default SubmitSection

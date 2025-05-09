import React from 'react'

import { Box, Button, Paper } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'

const CertificatesSection = () => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Box p={2}>
            <Button variant="primary">Select BPR Certificate</Button>
            <Button variant="primary">Select Participation Certificate</Button>
          </Box>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default CertificatesSection

import React from 'react'

import { Box, Button, Paper, Stack } from '@mui/material'
import ExampleCertificate from '../../certificates/ExampleCertificate'
import CertificateWrapper from '../../common/CertificateWrapper'
import SectionWrapper from '../../common/SectionWrapper'

const CertificatesSection = () => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack p={2} spacing={2}>
            <Stack direction="row" spacing={1}>
              <Button variant="primary" sx={{ mr: 1 }}>
                Select BPR Certificate
              </Button>
              <Button variant="primary">Select Participation Certificate</Button>
            </Stack>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <CertificateWrapper
                TemplateComponent={ExampleCertificate}
                studentName="[NAME]"
                date="[DATE]"
                courseName="[COURSE NAME]"
              />
              <CertificateWrapper
                TemplateComponent={ExampleCertificate}
                studentName="[NAME]"
                date="[DATE]"
                courseName="[COURSE NAME]"
              />
            </Stack>
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default CertificatesSection

import React from 'react'

import { Stack, Typography } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'

import FlagIcon from '@mui/icons-material/Flag'
import WatchLaterIcon from '@mui/icons-material/WatchLater'

const Conditions = () => {
  return (
    <SectionWrapper>
      <Stack sx={{ mt: 5, mb: 10 }}>
        <Typography fontSize={24} fontWeight="bold">
          Conditions for CPD Certification
        </Typography>
        <Typography mb={2}>
          After completing the course, each participant will receive a certificate of participation in the Professional
          School. Additionally, all professionals have the opportunity to receive a CPD (Continuous Professional
          Development) certificate worth 20 points. To obtain this certificate, participants must:
        </Typography>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <WatchLaterIcon color="secondary" />
            <Typography>Attend all webinars (40 academic hours).</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <FlagIcon color="secondary" />
            <Typography>Achieve at least 70% correct answers on the final assessment test.</Typography>
          </Stack>
        </Stack>
      </Stack>
    </SectionWrapper>
  )
}

export default Conditions

import React from 'react'

import { Box, Paper, Stack, Typography } from '@mui/material'
import { useConnectGoogleAccountMutation } from '../../../state/asynchronous'
import SectionWrapper from '../../common/SectionWrapper'
import GoogleAuthButton from '../GoogleAuthButton'

const AuthSection = () => {
  const [connectGoogleAccount, { isLoading }] = useConnectGoogleAccountMutation()
  const handleGoogleConnect = ({ token }) => {
    connectGoogleAccount({ token })
  }

  return (
    <SectionWrapper>
      <Paper>
        <Stack p={2}>
          <Stack direction="row" spacing={2}>
            <Box flex={1}>
              <Typography lineHeight="normal">Connect with Google</Typography>
              <Typography color="stormWave.main" lineHeight="normal">
                Securely link your Google account for faster login and easy access to personalized features.
              </Typography>
            </Box>
            <Box>{isLoading ? 'Loading...' : <GoogleAuthButton onClick={handleGoogleConnect} />}</Box>
          </Stack>
        </Stack>
      </Paper>
    </SectionWrapper>
  )
}

export default AuthSection

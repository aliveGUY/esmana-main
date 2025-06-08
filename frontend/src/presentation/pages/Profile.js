import React from 'react'
import { useSelector } from 'react-redux'

import { Avatar, Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material'
import SectionWrapper from '../common/SectionWrapper'
import AuthSection from '../components/Profile/AuthSection'

import PersonIcon from '@mui/icons-material/Person'

const Profile = () => {
  const theme = useTheme()
  const user = useSelector((state) => state.user)

  if (!user) return 'Error'

  const { email, firstName, middleName, lastName } = user

  return (
    <Stack px={2} py={3} spacing={2}>
      <SectionWrapper>
        <Paper
          elevation={1}
          sx={{
            px: 2,
            py: { xs: 2, md: 3 },
            background: { md: `linear-gradient(0deg, white 50%, ${theme.palette.snowFog.main} 50%)` },
          }}
        >
          <Stack direction={{ md: 'row' }} spacing={2} alignItems="center">
            <Avatar
              sx={{ width: 90, height: 90, border: '5px solid white', backgroundColor: theme.palette.stormWave.light }}
            >
              <PersonIcon sx={{ width: '100%', height: '100%', color: theme.palette.snowFog.dark }} />
            </Avatar>
            <Stack direction="row" width="100%" alignItems="center">
              <Stack flex={1}>
                <Typography variant="title" fontWeight="bold">
                  {[firstName, middleName, lastName].join(' ')}
                </Typography>
                <Typography variant="description" color="stormWave.main" mb={1}>
                  {email}
                </Typography>
              </Stack>
              <Box>
                <Button variant="outlined" disabled>
                  Edit Profile
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Paper>
      </SectionWrapper>
      <AuthSection />
    </Stack>
  )
}

export default Profile

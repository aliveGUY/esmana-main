import React from 'react'
import { Avatar, Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import SectionWrapper from '../common/SectionWrapper'

const Profile = () => {
  const theme = useTheme()
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
                  John Doe
                </Typography>
                <Typography variant="description" color="stormWave.main">
                  +1 234 56789
                </Typography>
                <Typography variant="description" color="stormWave.main" mb={1}>
                  example@gmail.com
                </Typography>
              </Stack>
              <Box>
                <Button variant="outlined">Edit Profile</Button>
              </Box>
            </Stack>
          </Stack>
        </Paper>
      </SectionWrapper>
      <SectionWrapper>
        <Paper sx={{ p: 2 }}>
          <Button variant="error" sx={{ width: { xs: '100%', md: 'auto' } }}>
            Change Password
          </Button>
        </Paper>
      </SectionWrapper>
    </Stack>
  )
}

export default Profile

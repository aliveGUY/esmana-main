import React from 'react'

import { Box, IconButton, Stack } from '@mui/material'
import NavLogo from '../../static/images/logo-big.png'
import LanguageSwitcher from './LanguageSwitcher'

import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'

const TopBarNavigation = ({ onBurgerClick }) => {
  return (
    <Stack
      height={64}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        zIndex: 10,
      }}
    >
      <Stack direction="row" alignItems="center">
        <Box pl="10px" pr={2}>
          <IconButton onClick={onBurgerClick} size="large">
            <MenuIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box sx={{ img: { height: { xs: 42, md: 56 } } }} pt={1}>
          <img src={NavLogo} alt="Esmana logo" className="logo" />
        </Box>
      </Stack>

      <Stack direction="row" pr={4} spacing={2}>
        <LanguageSwitcher />
        <IconButton>
          <NotificationsIcon />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default TopBarNavigation

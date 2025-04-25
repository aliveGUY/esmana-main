import React from 'react'

import { Box, Stack } from '@mui/material'
import NavLogo from '../../static/images/logo-big.png'

const TopBarUnauthorized = () => {
  return (
    <Stack sx={{ backgroundColor: '#2b6cb0', position: 'sticky', top: 0, zIndex: 1 }}>
      <Box sx={{ img: { height: 44 } }} px={4} py={1}>
        <img src={NavLogo} alt="Esmana logo" className="logo" />
      </Box>
    </Stack>
  )
}

export default TopBarUnauthorized

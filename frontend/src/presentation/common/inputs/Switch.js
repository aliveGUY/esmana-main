import React from 'react'

import { Switch as MuiSwitch, useMediaQuery, useTheme } from '@mui/material'

const Switch = ({ onClick, checked }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return <MuiSwitch checked={checked} onClick={onClick} size={isMobile ? 'large' : 'medium'} />
}

export default Switch

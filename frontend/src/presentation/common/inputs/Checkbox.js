import React from 'react'

import { useTheme } from '@emotion/react'

import { Checkbox as MuiCheckbox, useMediaQuery } from '@mui/material'

const Checkbox = ({ name, label, placeholder }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return <MuiCheckbox size={isMobile ? 'large' : 'medium'} />
}

export default Checkbox

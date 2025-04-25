import React from 'react'

import { Checkbox as MuiCheckbox, useMediaQuery } from '@mui/material'
import { useTheme } from '@emotion/react'

const Checkbox = ({ name, label, placeholder }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return <MuiCheckbox size={isMobile ? 'large' : 'medium'} />
}

export default Checkbox

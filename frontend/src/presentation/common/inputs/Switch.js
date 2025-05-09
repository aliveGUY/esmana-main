import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Switch as MuiSwitch, useMediaQuery, useTheme } from '@mui/material'

const Switch = ({ onClick, name }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <MuiSwitch onClick={onClick} size={isMobile ? 'large' : 'medium'} {...field} />}
    />
  )
}

export default Switch

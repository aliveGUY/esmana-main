import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Switch as MuiSwitch, useMediaQuery, useTheme } from '@mui/material'

const Switch = ({ onClick, onChange, name }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        console.log({ field })
        const handleChange = (e) => {
          onChange(e.target.checked)
          field.onChange(e)
        }

        return (
          <MuiSwitch
            onClick={onClick}
            size={isMobile ? 'large' : 'medium'}
            checked={field.value}
            {...field}
            onChange={handleChange}
          />
        )
      }}
    />
  )
}

export default Switch

import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormControl, TextField as MuiTextField, Typography } from '@mui/material'

const TextField = ({ name, label, placeholder }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl fullWidth>
          <Typography variant="body2" component="label" htmlFor={name} sx={{ mb: 0.5 }}>
            {label}
          </Typography>
          <MuiTextField id={name} placeholder={placeholder} {...field} />
        </FormControl>
      )}
    />
  )
}

export default TextField

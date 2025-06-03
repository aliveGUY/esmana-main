import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormControl, FormHelperText, TextField as MuiTextField, Typography } from '@mui/material'

const Password = ({ name, label, placeholder, staticLabel = false }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl fullWidth error={error}>
          {staticLabel && (
            <Typography variant="body2" component="label" htmlFor={name} sx={{ mb: 0.5 }}>
              {label}
            </Typography>
          )}
          <MuiTextField id={name} type="password" label={!staticLabel && label} placeholder={placeholder} {...field} />

          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

export default Password

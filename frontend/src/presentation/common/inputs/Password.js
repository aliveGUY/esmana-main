import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormControl, FormHelperText, TextField as MuiTextField, Typography } from '@mui/material'

const Password = ({ name, label, placeholder, staticLabel = false, required = null, autoComplete = 'off' }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]

  const rules = {
    ...(required && { required }),
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters long',
    },
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormControl fullWidth error={!!error}>
          {staticLabel && (
            <Typography variant="body2" component="label" htmlFor={name} sx={{ mb: 0.5 }}>
              {label}
            </Typography>
          )}
          <MuiTextField
            id={name}
            type="password"
            placeholder={placeholder}
            autoComplete={autoComplete}
            {...(!staticLabel && { label })}
            {...field}
          />
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

export default Password

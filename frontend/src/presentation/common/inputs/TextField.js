import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormControl, FormHelperText, TextField as MuiTextField, Typography } from '@mui/material'

const TextField = ({ name, label, onChange, placeholder, staticLabel = false, ...rest }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const handleChange = (e) => {
          onChange && onChange(e.target.value)
          field.onChange(e)
        }

        return (
          <FormControl fullWidth error={error}>
            {staticLabel && (
              <Typography variant="body2" component="label" htmlFor={name} sx={{ mb: 0.5 }}>
                {label}
              </Typography>
            )}
            <MuiTextField
              label={!staticLabel && label}
              id={name}
              placeholder={placeholder}
              {...field}
              {...rest}
              onChange={handleChange}
            />
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
}

export default TextField

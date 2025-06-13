import React from 'react'
import { isEmpty } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

import { FormControl, FormHelperText, TextField as MuiTextField, Typography } from '@mui/material'

const TextField = ({
  name,
  label,
  onChange,
  placeholder,
  staticLabel = false,
  autoComplete = 'on',
  required = null,
  pattern,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]

  const rules = {
    ...(required && { required }),
    ...(pattern && { pattern }),
  }

  return (
    <Controller
      control={control}
      name={name}
      {...(!isEmpty(rules) && { rules })}
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
              id={name}
              placeholder={placeholder}
              onChange={handleChange}
              autoComplete={autoComplete}
              {...field}
              {...rest}
              {...(!staticLabel && { label })}
            />
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
}

export default TextField

import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Textarea } from '@mui/joy'

import { FormControl, Typography } from '@mui/material'

const TextArea = ({ name, label, placeholder }) => {
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
          <Textarea minRows={5} maxRows={30} id={name} placeholder={placeholder} {...field} />
        </FormControl>
      )}
    />
  )
}

export default TextArea

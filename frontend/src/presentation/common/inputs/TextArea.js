import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormControl, TextField } from '@mui/material'

const TextArea = ({ name, label, placeholder }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl fullWidth>
          <TextField label={label} multiline minRows={5} maxRows={30} id={name} placeholder={placeholder} {...field} />
        </FormControl>
      )}
    />
  )
}

export default TextArea

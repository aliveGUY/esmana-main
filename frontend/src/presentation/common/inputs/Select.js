import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select as MuiSelect,
} from '@mui/material'

const MultiSelect = ({ name, label, options = [], onChange, required = null }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const rules = {
    ...(required && {
      validate: (value) =>
        Array.isArray(value) && value.length > 0 ? true : required?.message || 'This field is required',
    }),
  }

  const getTextFromValue = (value) => {
    return options.find((item) => item.value === value)?.text || value
  }

  const error = errors[name]

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      rules={rules}
      render={({ field: { value = [], onChange: fieldOnChange } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <MuiSelect
            labelId={`${name}-label`}
            id={`${name}-select`}
            multiple
            value={value}
            onChange={(e) => {
              fieldOnChange(e)
              onChange?.(e)
            }}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => selected.map(getTextFromValue).join(', ')}
          >
            {options.map(({ text, value: optionValue }) => (
              <MenuItem key={optionValue} value={optionValue}>
                <Checkbox checked={value.includes(optionValue)} />
                <ListItemText primary={text} />
              </MenuItem>
            ))}
          </MuiSelect>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

export default MultiSelect

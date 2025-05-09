import React from 'react'
import dayjs from 'dayjs'
import { Controller, useFormContext } from 'react-hook-form'

import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker'

const TimePicker = ({ name, label }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
        <MuiTimePicker
          label={label}
          value={value ? dayjs(new Date(value)) : null}
          onChange={(newValue) => {
            onChange(newValue ? new Date(newValue).toString() : null)
          }}
          slotProps={{
            textField: {
              error: !!error,
              helperText: error?.message,
            },
          }}
          {...rest}
        />
      )}
    />
  )
}

export default TimePicker

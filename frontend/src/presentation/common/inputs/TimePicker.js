import React from 'react'
import dayjs from 'dayjs'
import { Controller, useFormContext } from 'react-hook-form'

import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker'
import { isEmpty } from 'lodash'

const TimePicker = ({ name, label, required = null }) => {
  const { control } = useFormContext()

  const rules = {
    ...(required && { required }),
  }

  return (
    <Controller
      name={name}
      control={control}
      {...(!isEmpty(rules) && { rules })}
      render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
        <MuiTimePicker
          label={label}
          value={value ? dayjs(new Date(value)) : null}
          onChange={(newValue) => {
            const normalized = newValue ? dayjs(newValue).set('second', 0).set('millisecond', 0) : null
            onChange(normalized ? new Date(normalized.toISOString()) : null)
          }}
          ampm={false}
          minutesStep={15}
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

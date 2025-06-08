import React from 'react'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker'

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
          value={value ? dayjs(value) : null}
          onChange={(newValue) => {
            const normalized = newValue ? dayjs(newValue).set('second', 0).set('millisecond', 0) : null
            const time = normalized ? normalized.toDate() : null
            onChange(time)
          }}
          ampm={false}
          minutesStep={30}
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

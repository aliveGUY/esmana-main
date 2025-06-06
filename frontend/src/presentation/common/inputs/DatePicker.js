import React from 'react'
import dayjs from 'dayjs'
import { Controller, useFormContext } from 'react-hook-form'

import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'

import 'dayjs/locale/en-gb'
import { isEmpty } from 'lodash'

dayjs.locale('en-gb')

const DatePicker = ({ name, label, required = null }) => {
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
        <MuiDatePicker
          label={label}
          format="DD/MM/YYYY"
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

export default DatePicker

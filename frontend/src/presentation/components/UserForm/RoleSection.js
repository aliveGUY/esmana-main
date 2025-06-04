import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
} from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'

const RoleSection = () => {
  const { setValue, watch } = useFormContext()
  const roles = watch('roles')

  const names = [
    { text: 'User', value: 'user' },
    { text: 'Admin', value: 'admin' },
  ]

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setValue('roles', typeof value === 'string' ? value.split(',') : value)
  }

  const getTextFromValue = (value) => {
    return names.find((item) => item.value === value)?.text || value
  }

  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack p={2} spacing={2}>
            <FormControl>
              <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={roles}
                onChange={handleChange}
                input={<OutlinedInput label="Roles" />}
                renderValue={(selected) => selected.map(getTextFromValue).join(', ')}
              >
                {names.map(({ text, value }) => (
                  <MenuItem key={value} value={value}>
                    <Checkbox checked={roles.includes(value)} />
                    <ListItemText primary={text} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default RoleSection

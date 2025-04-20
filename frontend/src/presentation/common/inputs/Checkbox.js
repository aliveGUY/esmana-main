import React from 'react'

import { Checkbox as MuiCheckbox, FormControlLabel, FormGroup } from '@mui/material'

const Checkbox = ({ name, label, placeholder }) => {
  return (
    <FormGroup>
      <FormControlLabel control={<MuiCheckbox />} label={label} />
    </FormGroup>
  )
}

export default Checkbox

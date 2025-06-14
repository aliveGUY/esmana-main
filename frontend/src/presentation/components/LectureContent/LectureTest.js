import React from 'react'
import { map } from 'lodash'

import { Stack, Typography } from '@mui/material'
import CheckboxCollection from '../../common/CheckboxCollection'

const LectureTest = ({ test }) => {
  return (
    <Stack spacing={2}>
      {map(test, ({ questionText, options }) => (
        <Stack>
          <Typography fontWeight="bold">{questionText}</Typography>
          <CheckboxCollection options={options} />
        </Stack>
      ))}
    </Stack>
  )
}

export default LectureTest

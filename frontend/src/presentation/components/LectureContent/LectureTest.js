import React from 'react'
import { map } from 'lodash'

import { Stack, Typography } from '@mui/material'
import CheckboxCollection from '../../common/CheckboxCollection'

const LectureTest = ({ test }) => {
  return (
    <Stack spacing={3}>
      {map(test, ({ question, options }) => (
        <Stack spacing={2}>
          <Typography fontWeight="bold">{question}</Typography>
          <CheckboxCollection options={options} />
        </Stack>
      ))}
    </Stack>
  )
}

export default LectureTest

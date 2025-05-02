import React from 'react'
import { map } from 'lodash'

import { Checkbox, Stack, Typography } from '@mui/material'

const LectureTest = ({ test }) => {
  console.log({ test })
  return (
    <Stack spacing={3}>
      {map(test, ({ question, options }) => (
        <Stack spacing={2}>
          <Typography fontWeight="bold">{question}</Typography>
          {map(options, ({ text, value }) => (
            <Stack direction="row" spacing={1}>
              <Checkbox />
              <Typography>{text}</Typography>
            </Stack>
          ))}
        </Stack>
      ))}
    </Stack>
  )
}

export default LectureTest

import React from 'react'
import { map } from 'lodash'

import { Stack } from '@mui/material'
import CheckboxCollection from '../../common/inputs/CheckboxCollection'

const LectureTest = ({ test }) => {
  return (
    <Stack spacing={2}>
      {map(test, ({ id, questionText, options }, index) => (
        <CheckboxCollection key={index} name={id} options={options} label={questionText} />
      ))}
    </Stack>
  )
}

export default LectureTest

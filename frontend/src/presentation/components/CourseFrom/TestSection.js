import React from 'react'
import { map } from 'lodash'

import { Box, Button, Checkbox, IconButton, Paper, Stack, Typography } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

const Option = ({ option }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Checkbox />
      <Typography>{option}</Typography>
      <IconButton variant="outlined" color="error">
        <DeleteIcon />
      </IconButton>
    </Stack>
  )
}

const Question = ({ data }) => {
  const { question, options } = data
  return (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography>{question}</Typography>
        <IconButton variant="outlined" color="error">
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Stack sx={{ pl: 2 }} spacing={1}>
        <Box>
          <Button variant="outlined" endIcon={<AddIcon />}>
            Add Option
          </Button>
        </Box>
        {map(options, (option) => (
          <Option option={option} />
        ))}
      </Stack>
    </Stack>
  )
}

const TestSection = () => {
  const questions = [
    {
      question: 'Question Example',
      options: ['Option 1', 'Option 2'],
      correctAnswers: ['Option 1'],
    },
  ]

  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Box p={2}>
            <Typography fontWeight="bold">BPR evaluation</Typography>
            <Stack spacing={2}>
              <Box>
                <Button variant="outlined" endIcon={<AddIcon />}>
                  Add Question
                </Button>
              </Box>
              {map(questions, (question) => (
                <Question data={question} />
              ))}
            </Stack>
          </Box>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default TestSection

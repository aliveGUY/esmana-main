import React, { useCallback, useState } from 'react'
import { includes, map } from 'lodash'

import { Box, Button, Checkbox, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'

import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

const AddItemInput = ({ label, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = () => {
    onSubmit(value)
    setIsOpen(false)
  }

  if (isOpen) {
    return (
      <Stack spacing={1}>
        <TextField label={label} onChange={handleChange} />
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={toggle}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Stack>
      </Stack>
    )
  }

  return (
    <Box>
      <Button variant="outlined" endIcon={<AddIcon />} onClick={toggle}>
        {label}
      </Button>
    </Box>
  )
}

const Option = ({ option, answers, questionId, onRemoveOption, onRemoveQuestionAnswer, onSetQuestionAnswer }) => {
  const handleToggle = (e) => {
    if (e.target.checked) {
      onSetQuestionAnswer({ questionId, option })
    } else {
      onRemoveQuestionAnswer({ questionId, option })
    }
  }

  const handleRemoveOption = () => {
    onRemoveOption({ questionId, option })
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Checkbox onChange={handleToggle} checked={includes(answers, option)} />
      <Typography>{option}</Typography>
      <IconButton variant="outlined" color="error" onClick={handleRemoveOption}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  )
}

const Question = ({
  data,
  onAddOption,
  onRemoveQuestion,
  onRemoveOption,
  onRemoveQuestionAnswer,
  onSetQuestionAnswer,
}) => {
  const { question, options, answers, id } = data

  const handleAddOption = (data) => {
    onAddOption({ questionId: id, option: data })
  }

  const handleRemoveQuestion = () => {
    onRemoveQuestion(id)
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography>{question}</Typography>
        <IconButton variant="outlined" color="error" onClick={handleRemoveQuestion}>
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Stack sx={{ pl: 2 }} spacing={1}>
        {map(options, (option) => (
          <Option
            option={option}
            answers={answers}
            questionId={id}
            onRemoveOption={onRemoveOption}
            onRemoveQuestionAnswer={onRemoveQuestionAnswer}
            onSetQuestionAnswer={onSetQuestionAnswer}
          />
        ))}
        <AddItemInput label="Add Option" onSubmit={handleAddOption} />
      </Stack>
    </Stack>
  )
}

const TestSection = ({
  title,
  data = [],
  onAddOption,
  onAddQuestion,
  onRemoveOption,
  onRemoveQuestion,
  onRemoveQuestionAnswer,
  onSetQuestionAnswer,
}) => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Box p={2}>
            <Typography fontWeight="bold" pb={3}>
              {title}
            </Typography>
            <Stack spacing={2}>
              {map(data, (question) => (
                <Question
                  data={question}
                  onAddOption={onAddOption}
                  onRemoveOption={onRemoveOption}
                  onRemoveQuestion={onRemoveQuestion}
                  onRemoveQuestionAnswer={onRemoveQuestionAnswer}
                  onSetQuestionAnswer={onSetQuestionAnswer}
                />
              ))}
              <AddItemInput label="Add Question" onSubmit={onAddQuestion} />
            </Stack>
          </Box>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default TestSection

import React from 'react'
import { useDispatch } from 'react-redux'

import { Box, Paper, Stack, Typography } from '@mui/material'
import { setActive, setDescription, setTitle } from '../../../state/reducers/courseForm'
import Switch from '../../common/inputs/Switch'
import TextField from '../../common/inputs/TextField'
import SectionWrapper from '../../common/SectionWrapper'

const GeneralCourseInputSection = () => {
  const dispatch = useDispatch()

  const handleTitleChange = (value) => {
    dispatch(setTitle(value))
  }

  const handleDescriptionChange = (value) => {
    dispatch(setDescription(value))
  }

  const handleActiveChange = (value) => {
    dispatch(setActive(value))
  }

  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Box p={2}>
            <Stack spacing={2}>
              <TextField name="title" label="Title" onChange={handleTitleChange} />
              <TextField
                name="description"
                label="Description"
                onChange={handleDescriptionChange}
                multiline
                minRows={3}
                maxRows={30}
              />
              <Stack justifyContent="space-between" direction="row">
                <Box>
                  <Typography lineHeight="normal">Course is active</Typography>
                  <Typography color="stormWave.main" lineHeight="normal">
                    Indicates if this course is vissible to customers or not
                  </Typography>
                </Box>
                <Switch name="active" onChange={handleActiveChange} />
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default GeneralCourseInputSection

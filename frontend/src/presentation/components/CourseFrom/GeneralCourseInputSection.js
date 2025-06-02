import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Paper, Stack, Switch, TextField, Typography } from '@mui/material'
import { setDescription, setIsActive, setTitle } from '../../../state/reducers/courseForm'
import SectionWrapper from '../../common/SectionWrapper'

const GeneralCourseInputSection = () => {
  const courseForm = useSelector((state) => state.courseForm)

  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    dispatch(setTitle(event.target.value))
  }

  const handleDescriptionChange = (event) => {
    dispatch(setDescription(event.target.value))
  }

  const handleActiveChange = (event) => {
    dispatch(setIsActive(event.target.checked))
  }

  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Box p={2}>
            <Stack spacing={2}>
              <TextField name="title" label="Title" value={courseForm.title} onChange={handleTitleChange} />
              <TextField
                value={courseForm.description}
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

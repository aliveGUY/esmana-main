import React from 'react'
import { Link } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'

import { Box, Button, Stack } from '@mui/material'
import ContactSection from '../components/UserForm/ContactSection'
import LectorSection from '../components/UserForm/LectorSection'
import RoleSection from '../components/UserForm/RoleSection'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SubmitSection from '../components/CourseFrom/SubmitSection'

const EditUser = () => {
  const methods = useForm({
    defaultValues: {
      profilePicture: '',
      firstName: 'John',
      middleName: '',
      lastName: 'Doe',
      email: 'test@examplenn3.com',
      phone: '',
      roles: ['admin'],
      lectorDetails: null,
    },
  })

  const onSubmit = (data) => {
    console.log({ data })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2} pb={5}>
          <Box>
            <Button startIcon={<ArrowBackIcon />} to="/dashboard/users" component={Link} variant="outlined">
              Back
            </Button>
          </Box>
          <ContactSection />
          <RoleSection />
          <LectorSection />
          <SubmitSection />
        </Stack>
      </form>
    </FormProvider>
  )
}

export default EditUser

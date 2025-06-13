import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isEmpty, isEqual, omit } from 'lodash'
import { FormProvider, useForm } from 'react-hook-form'

import { Box, Button, Stack } from '@mui/material'
import { useRegisterMutation } from '../../state/asynchronous'
import SubmitSection from '../components/CourseFrom/SubmitSection'
import ContactSection from '../components/UserForm/ContactSection'
import LectorSection from '../components/UserForm/LectorSection'
import PasswordSection from '../components/UserForm/PasswordSection'
import ProfilePictureSection from '../components/UserForm/ProfilePictureSection'
import RoleSection from '../components/UserForm/RoleSection'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const CreateProfile = () => {
  const [register, { isSuccess, isLoading }] = useRegisterMutation()
  const navigate = useNavigate()
  const methods = useForm({
    defaultValues: {
      profilePicture: null,
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      roles: [],
      lectorDetails: null,
    },
  })

  const onSubmit = (accountForm) => {
    if (!isEqual(accountForm.password, accountForm.confirmPassword)) {
      methods.setError('password', { type: 'custom', message: 'Passwords should match' })
      methods.setError('confirmPassword', { type: 'custom', message: 'Passwords should match' })
      return
    }

    if (isEmpty(accountForm.email)) {
      methods.setError('email', { type: 'custom', message: 'Email is required' })
      return
    }

    const data = JSON.stringify(omit(accountForm, ['profilePicture', 'confirmPassword']))
    const formData = new FormData()

    formData.append('data', data)
    if (accountForm.profilePicture) {
      formData.append('profilePicture', accountForm.profilePicture)
    }

    register(formData)
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard/users')
    }
  }, [isSuccess])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2} pb={5}>
          <Box>
            <Button startIcon={<ArrowBackIcon />} to="/dashboard/users" component={Link} variant="outlined">
              Back
            </Button>
          </Box>
          <ProfilePictureSection />
          <ContactSection />
          <PasswordSection />
          <RoleSection />
          <LectorSection />
          <SubmitSection isLoading={isLoading} />
        </Stack>
      </form>
    </FormProvider>
  )
}

export default CreateProfile

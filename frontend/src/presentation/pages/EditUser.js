import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'

import { Box, Button, Stack } from '@mui/material'
import ContactSection from '../components/UserForm/ContactSection'
import LectorSection from '../components/UserForm/LectorSection'
import RoleSection from '../components/UserForm/RoleSection'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SubmitSection from '../components/CourseFrom/SubmitSection'
import { useGetUserByIdMutation } from '../../state/asynchronous'
import ProfilePictureSection from '../components/UserForm/ProfilePictureSection'

const EditUser = () => {
  const { userId } = useParams()
  const [getUserById, { data }] = useGetUserByIdMutation()

  const methods = useForm({
    defaultValues: {
      id: userId,
      profilePicture: null,
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      roles: [],
      lectorDetails: null,
    },
  })

  const onSubmit = (data) => {
    console.log({ data })
  }

  useEffect(() => {
    getUserById(userId)
  }, [])

  useEffect(() => {
    if (!data) return

    methods.setValue('profilePicture', data.profilePicture)
    methods.setValue('firstName', data.firstName)
    methods.setValue('middleName', data.middleName)
    methods.setValue('lastName', data.lastName)
    methods.setValue('email', data.email)
    methods.setValue('phone', data.phone)
    methods.setValue('roles', data.roles)
    methods.setValue('lectorDetails', data.lectorDetails)
  }, [data])

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
          <RoleSection />
          <LectorSection />
          <SubmitSection />
        </Stack>
      </form>
    </FormProvider>
  )
}

export default EditUser

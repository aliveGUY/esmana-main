import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { isEmpty, omit } from 'lodash'
import { FormProvider, useForm } from 'react-hook-form'

import { Box, Button, Stack } from '@mui/material'
import { useEditAccountMutation, useGetUserByIdMutation } from '../../state/asynchronous'
import SubmitSection from '../components/CourseFrom/SubmitSection'
import ContactSection from '../components/UserForm/ContactSection'
import LectorSection from '../components/UserForm/LectorSection'
import ProfilePictureSection from '../components/UserForm/ProfilePictureSection'
import RoleSection from '../components/UserForm/RoleSection'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const EditUser = () => {
  const { userId } = useParams()
  const [editAccount, { isLoading, isSuccess }] = useEditAccountMutation()
  const [getUserById, { data }] = useGetUserByIdMutation()
  const navigate = useNavigate()

  const methods = useForm({
    defaultValues: {
      id: userId,
      profilePicture: null,
      profilePictureFile: null,
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      roles: [],
      lectorDetails: null,
    },
  })

  const onSubmit = (accountForm) => {
    if (isEmpty(accountForm.email)) {
      methods.setError('email', { type: 'custom', message: 'Email is required' })
      return
    }

    const data = JSON.stringify(omit(accountForm, ['profilePicture']))
    const formData = new FormData()

    formData.append('data', data)
    if (accountForm.profilePictureFile) {
      formData.append('profilePicture', accountForm.profilePictureFile)
    }

    editAccount(formData)
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
          <RoleSection />
          <LectorSection />
          <SubmitSection isLoading={isLoading} />
        </Stack>
      </form>
    </FormProvider>
  )
}

export default EditUser

import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { isEmpty, isEqual } from 'lodash'

import { Box, Button, Divider, Grid2, Stack, Typography } from '@mui/material'
import { useCreateCheckoutFormMutation, useCreateCheckoutFormWithGoogleMutation } from '../../state/asynchronous'
import Password from '../common/inputs/Password'
import TextField from '../common/inputs/TextField'
import { FormProvider, useForm } from 'react-hook-form'
import GoogleAuthButton from '../components/GoogleAuthButton'

const Registration = () => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12 }}>
        <TextField
          staticLabel
          name="email"
          label="Email"
          placeholder="Enter your email"
          required="Email is required"
          pattern={{
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Enter a valid email address',
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <TextField
          staticLabel
          name="phone"
          label="Phone"
          placeholder="Enter your phone"
          required="Phone is required"
          pattern={{
            value: /^\+?[0-9\s\-()]{7,20}$/,
            message: 'Enter a valid phone number',
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <TextField
          staticLabel
          name="firstName"
          label="First Name"
          placeholder="Enter first name"
          required="First name is required"
        />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <TextField staticLabel name="middle_name" label="Middle Name (Optional)" placeholder="Enter middle name" />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <TextField
          staticLabel
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          required="Last name is required"
        />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Password
          staticLabel
          name="password"
          label="Password"
          placeholder="Enter your password"
          required="Password is required"
        />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Password
          staticLabel
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          required="Password is required"
        />
      </Grid2>
    </Grid2>
  )
}

const CheckoutCourses = () => {
  const [searchParams] = useSearchParams()
  const lectureIds = searchParams.getAll('lids')
  const methods = useForm()

  const [createCheckoutForm, { data: form, isLoading: isFormLoading }] = useCreateCheckoutFormMutation()
  const [createCheckoutFormWithGoogle, { data: googleForm, isLoading: isGoogleFormLoading }] =
    useCreateCheckoutFormWithGoogleMutation()

  const isLoading = isFormLoading || isGoogleFormLoading

  const handleRegister = (data) => {
    if (isEmpty(lectureIds)) return redirectToMarketing()

    if (!isEqual(data.password, data.confirmPassword)) {
      methods.setError('password', { type: 'custom', message: 'Passwords do not match' })
      methods.setError('confirmPassword', { type: 'custom', message: 'Passwords do not match' })
    }

    createCheckoutForm({
      lectureIds: lectureIds,
      formData: {
        firstName: 'John',
        middleName: 'Jr',
        lastName: 'Doe',
        email: 'example@gmail.com',
        phone: '+123456789',
        password: 'test-password',
      },
    })
  }

  const handleGoogleSignup = ({ token }) => {
    if (isEmpty(lectureIds)) return redirectToMarketing()
    createCheckoutFormWithGoogle({ lectureIds, token: { token } })
  }

  const executeCheckoutForm = (formData) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(formData, 'text/html')

    const form = doc.querySelector('form')
    document.body.appendChild(form)
    form.submit()
  }

  const redirectToMarketing = () => {
    window.open('https://school.esmana-main.org', '_blank')
  }

  useEffect(() => {
    if (form) {
      executeCheckoutForm(form)
    }

    if (googleForm) {
      executeCheckoutForm(googleForm)
    }
  }, [form, googleForm])

  return (
    <Box p={3} maxWidth={600} m="0 auto">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleRegister)}>
          <Stack spacing={3} pt={3} pb={10}>
            <Stack alignItems="center">
              <Typography textAlign="center" fontSize={32} fontWeight="bold" maxWidth={360}>
                Let's Get You Signed Up Before Checkout
              </Typography>
            </Stack>
            <Registration />
            <Stack spacing={2}>
              <Button variant="secondary" type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Register & Checkout'}
              </Button>
              <Box sx={{ my: 2 }}>
                <Divider>
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                </Divider>
              </Box>
              <GoogleAuthButton text="signup_with" onClick={handleGoogleSignup} />
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  )
}

export default CheckoutCourses

import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { isEmpty } from 'lodash'

import { Box, Button, Divider, Grid2, Stack, Typography } from '@mui/material'
import { useCreateCheckoutFormMutation } from '../../state/asynchronous'
import Password from '../common/inputs/Password'
import TextField from '../common/inputs/TextField'

const SummaryCard = () => {
  return (
    <Box>
      <Typography>Details</Typography>
      <Stack direction="row" spacing={2}>
        <Typography>Course</Typography>
        <Typography>2/2 Lectures</Typography>
      </Stack>
      <Divider />
      <Typography>Discount Info</Typography>
      <Typography>4.000 UAH</Typography>
      <Button type="submit" variant="secondary">
        Purchase
      </Button>
    </Box>
  )
}

const Product = () => {
  return (
    <Grid2 container>
      <Grid2 size={{ xs: 2 }}>Picture</Grid2>
      <Grid2 size={{ xs: 8 }}>
        <Typography fontWeight="bold">Course Name</Typography>
        <Typography>Cropped Description</Typography>
        <Typography color="stormWave">Selected 2/20 Lectures * 4 hours * 8 materails</Typography>
      </Grid2>
      <Grid2 size={{ xs: 2 }}>
        <Typography fontWeight="bold">4.000UAH</Typography>
        <Typography fontSize={14}>30.000UAH</Typography>
      </Grid2>
    </Grid2>
  )
}

const Payment = () => {
  return (
    <Stack>
      <Stack direction="row">
        <Box>Credit Card</Box>
        <Box>Google Pay</Box>
      </Stack>

      <Stack spacing={2}>
        <TextField staticLabel name="card_number" label="Card Number" />
        <Stack spacing={2} direction="row">
          <TextField staticLabel name="exp_date" label="Exp Date" />
          <TextField staticLabel name="cvc" label="CVC" />
        </Stack>
      </Stack>
    </Stack>
  )
}

const Registration = () => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 6 }}>
        <TextField staticLabel name="email" label="Email" />
      </Grid2>
      <Grid2 size={{ xs: 6 }}>
        <Typography>Or Google Login</Typography>
      </Grid2>
      <Grid2 size={{ xs: 6 }}>
        <TextField staticLabel name="first_name" label="First Name" />
      </Grid2>
      <Grid2 size={{ xs: 6 }}>
        <TextField staticLabel name="middle_name" label="Middle Name" />
      </Grid2>
      <Grid2 size={{ xs: 6 }}>
        <TextField staticLabel name="last_name" label="Last Name" />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Password name="password" label="Password" />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Password name="confirm_password" label="Confirm Password" />
      </Grid2>
    </Grid2>
  )
}

const CheckoutCourses = () => {
  const [searchParams] = useSearchParams()
  const lectureIds = searchParams.getAll('lids')

  const [createCheckoutForm, { data, isLoading }] = useCreateCheckoutFormMutation()

  const handleBuy = () => {
    if (isEmpty(lectureIds)) throw new Error('NO LECTURES SELECTED')

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

  useEffect(() => {
    if (data) {
      const form = document.getElementById('wayforpayForm')
      if (form) form.submit()
    }
  }, [data])

  return (
    <Box p={3}>
      <Button variant="secondary" onClick={handleBuy} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Buy'}
      </Button>
      {data && <div dangerouslySetInnerHTML={{ __html: data }} />}
    </Box>
  )
}

export default CheckoutCourses

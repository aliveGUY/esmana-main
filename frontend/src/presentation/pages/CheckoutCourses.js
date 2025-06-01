import { Box, Button, Divider, Grid2, Stack, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import SectionWrapper from '../common/SectionWrapper'
import { Grid } from '@mui/joy'
import TextField from '../common/inputs/TextField'
import Password from '../common/inputs/Password'

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
  const methods = useForm()

  const onSubmit = (data) => {
    console.log({ data })
  }

  return (
    <Box p={3}>
      <SectionWrapper>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack direction="row" spacing={4}>
              <Stack flex={1} spacing={3}>
                <Product />
                <Divider />
                <Payment />
                <Divider />
                <Registration />
              </Stack>
              <SummaryCard />
            </Stack>
          </form>
        </FormProvider>
      </SectionWrapper>
    </Box>
  )
}

export default CheckoutCourses

import React from 'react'

import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js'

import { Grid2 } from '@mui/material'
import StripeTexField from '../common/inputs/StripeTexField'
import TextField from '../common/inputs/TextField'

const CardPayment = () => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12 }}>
        <TextField name="cardOwner" label="Card owner" placeholder="Enter card owner" />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <StripeTexField label="Card number">
          <CardNumberElement />
        </StripeTexField>
      </Grid2>
      <Grid2 size={{ xs: 6 }}>
        <StripeTexField label="Expiration date">
          <CardExpiryElement />
        </StripeTexField>
      </Grid2>
      <Grid2 size={{ xs: 6 }}>
        <StripeTexField label="Secret code">
          <CardCvcElement />
        </StripeTexField>
      </Grid2>
    </Grid2>
  )
}

export default CardPayment

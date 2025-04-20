import React from 'react'

import {
  INPUT_SPREAD_FULL,
  INPUT_SPREAD_HALF,
  INPUT_TYPE_CHECKBOX,
  INPUT_TYPE_PASSWORD,
  INPUT_TYPE_TEXTAREA,
  INPUT_TYPE_TEXTFIELD,
} from '../../constants'

import { Box, Stack, Typography } from '@mui/material'
import SectionWrapper from '../common/SectionWrapper'
import MembershipCheckoutForm from '../components/MembershipCheckoutForm'

import NavLogo from '../../static/images/logo-big.png'

const CheckoutMembership = () => {
  const config = [
    {
      inputs: [
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'firstName',
          label: 'First name',
          placeholder: 'Enter your first name',
          spread: INPUT_SPREAD_HALF,
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'middleName',
          label: 'Middle name',
          placeholder: 'Enter your middle name',
          spread: INPUT_SPREAD_HALF,
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'lastName',
          label: 'Last name',
          placeholder: 'Enter your last name',
          spread: INPUT_SPREAD_HALF,
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'birthDate',
          label: 'Birth date',
          placeholder: 'Enter your birth date',
          spread: INPUT_SPREAD_HALF,
        },
      ],
    },
    {
      inputs: [
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'address',
          label: 'Address',
          placeholder: 'Enter your address',
          spread: INPUT_SPREAD_FULL,
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'city',
          label: 'City',
          placeholder: 'Enter your city',
          spread: INPUT_SPREAD_HALF,
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'postal_code',
          label: 'Postal code',
          placeholder: 'Enter your postal code',
          spread: INPUT_SPREAD_HALF,
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'country',
          label: 'Country',
          placeholder: 'Enter your country',
          spread: INPUT_SPREAD_HALF,
        },
      ],
    },
    {
      inputs: [
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'student card id',
          label: 'Photo of student card',
          placeholder: 'Photo of student card',
          spread: INPUT_SPREAD_HALF,
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'specialty',
          label: 'Specialty',
          placeholder: 'Enter your specialty',
          spread: INPUT_SPREAD_HALF,
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'educationInstitution',
          label: 'Education institution',
          placeholder: 'Enter your education institution',
          spread: INPUT_SPREAD_HALF,
        },
      ],
    },
    {
      inputs: [
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'education',
          label: 'Education',
          placeholder: 'Enter your education',
          spread: INPUT_SPREAD_HALF,
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'diplomaNumber',
          label: 'Photo of diploma',
          placeholder: 'Enter your photo of diploma',
          spread: INPUT_SPREAD_HALF,
        },
      ],
    },
    {
      inputs: [
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'workplace',
          label: 'Place of work',
          placeholder: 'Enter your place of work',
          spread: INPUT_SPREAD_HALF,
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'jobTitle',
          label: 'Job title',
          placeholder: 'Enter your job title',
          spread: INPUT_SPREAD_HALF,
        },
        {
          inputType: INPUT_TYPE_TEXTAREA,
          name: 'workExperience',
          label: 'Work experience',
          placeholder: 'Enter your work experience',
          spread: INPUT_SPREAD_FULL,
        },
      ],
    },
    {
      inputs: [
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'phone',
          label: 'Phone',
          placeholder: 'Enter your phone',
          spread: INPUT_SPREAD_HALF,
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'email',
          label: 'Email',
          placeholder: 'Enter your email',
          spread: INPUT_SPREAD_HALF,
        },
        {
          inputType: INPUT_TYPE_PASSWORD,
          name: 'password',
          label: 'Password',
          placeholder: 'Enter your password',
          spread: INPUT_SPREAD_FULL,
        },
        {
          inputType: INPUT_TYPE_PASSWORD,
          name: 'confirmPassword',
          label: 'Confirm password',
          placeholder: 'Enter your confirm password',
          spread: INPUT_SPREAD_FULL,
        },
      ],
    },
    {
      inputs: [
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'taxpayerId',
          label: 'VAT number',
          placeholder: 'Enter your VAT number',
          spread: INPUT_SPREAD_FULL,
        },
        {
          inputType: INPUT_TYPE_CHECKBOX,
          name: 'noVAT',
          label: "I don't have VAT number",
          placeholder: "I don't have VAT number",
          spread: INPUT_SPREAD_FULL,
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'passportId',
          label: 'Passport id',
          placeholder: 'Enter your passport id',
          spread: INPUT_SPREAD_FULL,
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: 'passportIssuedBy',
          label: 'Passport issued by',
          placeholder: 'Enter your passport issued by',
          spread: INPUT_SPREAD_FULL,
        },
      ],
    },
    {
      inputs: [
        {
          inputType: INPUT_TYPE_CHECKBOX,
          name: 'personalDataCollectionConsent',
          label: 'Agreement',
          placeholder: 'Enter your agreement',
          spread: INPUT_SPREAD_FULL,
        },
      ],
    },
  ]

  return (
    <Box pb={4}>
      <Box
        sx={{
          p: 3,
          mb: 3,
          background: 'linear-gradient(135deg,#0045a2 10%,#A644E5 100%)',
        }}
      >
        <SectionWrapper>
          <Stack>
            <Box sx={{ img: { height: 44 } }}>
              <img src={NavLogo} alt="Esmana logo" className="logo" />
            </Box>
            <Typography color="white" fontSize={32} textAlign="center">
              Join a Public Association
            </Typography>
          </Stack>
        </SectionWrapper>
      </Box>
      <SectionWrapper>
        <MembershipCheckoutForm config={config} />
      </SectionWrapper>
    </Box>
  )
}

export default CheckoutMembership

import React from 'react'
import { useTranslation } from 'react-i18next'
import SectionWrapper from '../../common/SectionWrapper'
import { Button, Stack, Typography } from '@mui/material'

const Hero = ({ title, mobileDescription, description }) => {
  const { t } = useTranslation()

  return (
    <SectionWrapper>
      <Stack>
        <Typography fontWeight="bold" fontSize={24} textAlign="center">
          {title}
        </Typography>
        <Typography display={{ xs: 'block' }} textAlign="center" color="stormWave.main" px="6px">
          {mobileDescription}
        </Typography>
        <Typography display={{ xs: 'none', md: 'block' }} textAlign="center" color="stormWave.main" px="6px">
          {description}
        </Typography>
        <Stack direction={{ md: 'row-reverse' }} justifyContent="center" spacing={2}>
          <Button variant="contained">{t('Join')}</Button>
          <Button variant="outlined">{t('View Lectures')}</Button>
        </Stack>
      </Stack>
    </SectionWrapper>
  )
}

export default Hero

import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Stack, Typography } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'

const Hero = () => {
  const { t } = useTranslation()

  return (
    <SectionWrapper>
      <Stack spacing={2} sx={{ py: 5, px: 1 }}>
        <Stack spacing={{ md: 2 }}>
          <Typography fontWeight="bold" fontSize={{ xs: 23, md: 56 }} lineHeight="normal" textAlign="center">
            International Professional School
            <br />
            &ldquo;Sleep Medicine&rdquo; 2025
          </Typography>
          <Typography display={{ md: 'none' }} textAlign="center" color="stormWave.main" px="6px">
            Sleep: Physiology, Diagnostics, Treatment. <br />
            Theory and Practice for All Age Groups.
          </Typography>
          <Typography display={{ xs: 'none', md: 'block' }} textAlign="center" color="stormWave.main" px="6px">
            Key aspects of physiology, diagnosis, and treatment of sleep
            <br /> disorders. Current scientific knowledge and practical skills
            <br /> for effective work with patients of various ages.
          </Typography>
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row-reverse' }} justifyContent="center" spacing={{ xs: 1, md: 2 }}>
          <Button variant="primary">{t('Purchase Course')}</Button>
          <Button variant="outlined">{t('View Program')}</Button>
        </Stack>
      </Stack>
    </SectionWrapper>
  )
}

export default Hero

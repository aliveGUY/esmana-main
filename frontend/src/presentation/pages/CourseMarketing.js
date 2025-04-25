import React from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Button, Stack, Typography } from '@mui/material'
import GradientPng from '../../static/images/marketing-background.png'
import FlagPng from '../../static/images/marketing-flag.png'
import SectionWrapper from '../common/SectionWrapper'

const CourseMarketing = () => {
  const { t } = useTranslation()

  return (
    <Stack>
      <SectionWrapper>
        <Stack>
          <Typography fontWeight="bold" fontSize={24} textAlign="center">
            {t('course_title', 'Міжнародна фахова школа "Медицина сну" 2025')}
          </Typography>
          <Typography textAlign="center" color="stormWave.main" px="6px">
            {t('course_subtitle', 'Сон: фізіологія, діагностика, лікування. Теорія та практика для всіх вікових груп.')}
          </Typography>
          <Button variant="contained">{t('course_join_button', 'Доєднатись')}</Button>
          <Button variant="outlined">{t('course_view_content_button', 'Перелянути зміст')}</Button>
        </Stack>
      </SectionWrapper>

      <Box
        sx={{
          marginTop: { xs: 5, md: 10 },
          height: { xs: 64, md: 144 },
          position: 'relative',

          '& .background': {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            right: 0,
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          },

          '& .flag': {
            height: { xs: 100, md: 200 },
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
          },
        }}
      >
        <img alt={t('gradient_alt', 'Gradient')} src={GradientPng} className="background" />
        <img alt={t('flag_alt', 'Flag')} src={FlagPng} className="flag" />
      </Box>
    </Stack>
  )
}

export default CourseMarketing

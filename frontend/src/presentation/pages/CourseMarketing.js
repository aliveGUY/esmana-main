import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { map } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import { Box, Button, Checkbox, Divider, Stack, Switch, Typography } from '@mui/material'
import GradientPng from '../../static/images/marketing-background.png'
import FlagPng from '../../static/images/marketing-flag.png'
import SectionWrapper from '../common/SectionWrapper'

const LectureItem = ({ lecture, isAllLectures }) => {
  const { description, title, startTime, endTime, price } = lecture

  const date = startTime.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const hoursStart = startTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const hoursEnd = endTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <Stack direction="row">
      <Box display={isAllLectures ? 'none' : 'block'}>
        <Checkbox checked={true} />
      </Box>
      <Stack direction={{ md: 'row' }} width="100%" justifyContent={{ md: 'space-between' }}>
        <Stack direction={{ md: 'row-reverse' }} spacing={2}>
          <Stack>
            <Typography fontWeight="bold">{title}</Typography>
            <Typography display={{ xs: 'none', md: 'block' }}>{description}</Typography>
          </Stack>
          <Stack direction={{ xs: 'row', md: 'column' }} alignItems={{ md: 'end' }} spacing={{ xs: 2, md: 0 }}>
            <Typography whiteSpace="nowrap">
              {hoursStart} - {hoursEnd}
            </Typography>
            <Typography whiteSpace="nowrap" color="stormWave.main">
              {date}
            </Typography>
          </Stack>
        </Stack>
        <Box display={isAllLectures ? 'none' : 'block'}>
          <Typography whiteSpace="nowrap" fontWeight="bold">
            {price} UAH
          </Typography>
        </Box>
      </Stack>
    </Stack>
  )
}

const SummaryCard = ({ isAllLectures, onToggle }) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ position: { xs: 'sticky', md: 'relative' }, bottom: 0, backgroundColor: 'white' }} width="100%" flex={1}>
      <Box sx={{ position: { md: 'sticky' }, top: 64 }}>
        <Stack direction={{ xs: 'row', md: 'column-reverse' }} justifyContent="space-between">
          <Typography variant="title" fontWeight={700}>
            6k UAH
          </Typography>
          <Divider />
          <Stack>
            <Typography display={{ xs: 'none', md: 'block' }} fontWeight="bold">
              Summary
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography display={{ md: 'none' }}>All Lectures</Typography>
              <Typography display={{ xs: 'none', md: 'block' }}>Join to all lectures</Typography>
              <Switch checked={isAllLectures} onClick={onToggle} />
            </Stack>
            <Typography display={{ xs: 'none', md: 'block' }} color="stormWave.main">
              Discount info
            </Typography>
          </Stack>
        </Stack>
        <Button variant="contained">{t('Purchase')}</Button>
      </Box>
    </Box>
  )
}

const CourseMarketing = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { availableCourses } = useSelector((state) => state.courses)
  const { title, description, mobileDescription, lectures } = availableCourses[id]
  const [isAllLectures, setIsAllLectures] = useState(true)

  const handleSelectionToggle = () => {
    console.log('test')
    setIsAllLectures((prev) => !prev)
  }

  return (
    <Stack>
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

      <SectionWrapper>
        <Stack direction={{ md: 'row' }} spacing={4}>
          <Stack spacing={2} width="100%" flex={2}>
            {map(lectures, (lecture, index) => (
              <LectureItem lecture={lecture} key={index} isAllLectures={isAllLectures} />
            ))}
          </Stack>
          <SummaryCard onToggle={handleSelectionToggle} isAllLectures={isAllLectures} />
        </Stack>
      </SectionWrapper>
    </Stack>
  )
}

export default CourseMarketing

import { Box, Button, Divider, Stack, Switch, Typography } from '@mui/material'
import React, { useState } from 'react'
import SectionWrapper from '../../common/SectionWrapper'
import { map } from 'lodash'
import { useTranslation } from 'react-i18next'
import Checkbox from '../../common/inputs/Checkbox'

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

const Lectures = ({ lectures }) => {
  const [isAllLectures, setIsAllLectures] = useState(true)

  const handleSelectionToggle = () => {
    setIsAllLectures((prev) => !prev)
  }

  return (
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
  )
}

export default Lectures

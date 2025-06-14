import { Link, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { isEmpty, some } from 'lodash'
import { useTranslation } from 'react-i18next'

import { Box, Button, Stack, Typography } from '@mui/material'
import { useLectures } from '../../../hooks'
import { useAuth } from '../../../hooks/useAuth'
import GoogleMeetSvg from '../../../static/images/google-meet-colored.svg'
import LectureVideo from '../LectureVideo'
import RichTextViewer from '../RichTextViewer'
import LectureTest from './LectureTest'

import '../RichTextEditor/editor-styles.css'
import { FormProvider, useForm } from 'react-hook-form'
import SubmitButtonFactory from './SubmitButtonFactory'
import { useEffect } from 'react'

const LectureContent = () => {
  const { user } = useAuth()
  const { lectureId } = useParams()
  const { i18n } = useTranslation()
  const { isFirstLecture, currentLecture, previousAvailableLectureLink } = useLectures()

  const methods = useForm({
    defaultValues: {
      collection: [],
    },
  })

  const { description, title, materials, startTime, endTime } = currentLecture
  const currentLang = i18n.language

  const isAvailable = !isEmpty(materials)
  const isPurchased = some(currentLecture.users, (userLecture) => userLecture.user.id === user?.id)
  const isStartInFuture = dayjs(startTime).isAfter(dayjs(), 'day')
  const isStartToday = dayjs(startTime).isSame(dayjs(), 'day')
  const isEndInPast = dayjs(endTime).isBefore(dayjs(), 'day')
  const formattedStartTimeLarge = dayjs(startTime).format('DD.MM.YYYY HH:mm')
  const formattedStartTime = dayjs(startTime).format('HH:mm')

  const meetingMessage = isStartToday
    ? `Starts today at ${formattedStartTime}`
    : `Meeting will start at ${formattedStartTimeLarge}`

  useEffect(() => {
    methods.reset()
  }, [lectureId])

  return (
    <Stack sx={{ pb: 5 }} spacing={3}>
      <LectureVideo videoId={materials?.videoUrl} isPurchased={isPurchased} />

      <Stack direction={{ md: 'row' }}>
        <Box width="100%" mb={{ xs: 2, md: 0 }}>
          <Typography fontWeight="bold">{title}</Typography>
          <Typography>{description}</Typography>
        </Box>
        {!isEndInPast && materials?.meetingUrl && (
          <Box minWidth={200}>
            <Typography sx={{ color: 'stormWave.main', mb: 1 }}>{meetingMessage}</Typography>
            <Button
              disabled={isStartInFuture || isEndInPast}
              component={Link}
              to={materials?.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              fullWidth
              endIcon={
                <Stack justifyContent="center" alignItems="center">
                  <Box
                    sx={{ height: 24, svg: { width: 26, height: 24, backgroundColor: 'white', borderRadius: '8px' } }}
                  >
                    <GoogleMeetSvg />
                  </Box>
                </Stack>
              }
            >
              Join Lecture
            </Button>
          </Box>
        )}
      </Stack>

      <FormProvider {...methods}>
        <Box flex={1}>
          {isAvailable && (
            <Stack spacing={3}>
              <RichTextViewer content={materials.richText[currentLang]} />
              <LectureTest test={materials.evaluation} />
            </Stack>
          )}
        </Box>

        <Stack direction="row" sx={{ mt: 4 }}>
          {!isFirstLecture && (
            <Button
              variant="outlined"
              component={Link}
              to={previousAvailableLectureLink}
              disabled={!previousAvailableLectureLink}
            >
              Previous
            </Button>
          )}
          <Box flex={1} />
          <SubmitButtonFactory />
        </Stack>
      </FormProvider>
    </Stack>
  )
}

export default LectureContent

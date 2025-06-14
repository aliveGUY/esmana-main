import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { isEmpty, some } from 'lodash'
import { useTranslation } from 'react-i18next'

import { Box, Button, Stack, Typography } from '@mui/material'
import { useAuth } from '../../../hooks/useAuth'
import GoogleMeetSvg from '../../../static/images/google-meet-colored.svg'
import LectureVideo from '../LectureVideo'
import RichTextViewer from '../RichTextViewer'
import LectureTest from './LectureTest'

import '../RichTextEditor/editor-styles.css'
import { useLectures } from '../../../hooks'

const LectureContent = () => {
  const { currentLecture } = useLectures()

  const { description, title, materials, startTime, endTime } = currentLecture
  const { user } = useAuth()
  const { i18n } = useTranslation()
  const { isFirstLecture, isLastLecture } = useLectures()

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

      <Box flex={1}>
        {isAvailable && (
          <Stack spacing={3}>
            <RichTextViewer content={materials.richText[currentLang]} />
            <LectureTest test={materials.evaluation} />
          </Stack>
        )}
      </Box>

      <Stack direction="row" sx={{ mt: 4 }}>
        {!isFirstLecture && <Button variant="outlined">Previous</Button>}
        <Box flex={1} />
        {isLastLecture ? <Button variant="primary">Finish</Button> : <Button variant="primary">Next</Button>}
      </Stack>
    </Stack>
  )
}

export default LectureContent

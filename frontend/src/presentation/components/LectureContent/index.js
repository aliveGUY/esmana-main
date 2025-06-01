import { isEmpty } from 'lodash'

import { Box, Button, Stack, Typography } from '@mui/material'
import GoogleMeetSvg from '../../../static/images/google-meet-colored.svg'
import LectureVideo from '../LectureVideo'
import RichTextViewer from '../RichTextViewer'
import LectureTest from './LectureTest'
import { useTranslation } from 'react-i18next'

import '../RichTextEditor/editor-styles.css'

const LectureContent = ({ lecture }) => {
  const { description, title, materials, status } = lecture
  const { i18n } = useTranslation()
  const currentLang = i18n.language

  const isAvailable = !isEmpty(materials)
  const isPurchased = !isEmpty(status)

  console.log({ materials })

  return (
    <Stack sx={{ pb: 5 }} spacing={3}>
      <LectureVideo embeddedVideo={materials?.embeddedVideo} isPurchased={isPurchased} />

      <Stack direction={{ md: 'row' }}>
        <Box width="100%" mb={{ xs: 2, md: 0 }}>
          <Typography fontWeight="bold">{title}</Typography>
          <Typography>{description}</Typography>
        </Box>
        <Box>
          <Typography sx={{ color: 'stormWave.main', mb: 1 }}>Meeting will start at 12.04.2025 14:00</Typography>
          <Button
            variant="secondary"
            fullWidth
            endIcon={
              <Stack justifyContent="center" alignItems="center">
                <Box sx={{ height: 24, svg: { width: 26, height: 24, backgroundColor: 'white', borderRadius: '8px' } }}>
                  <GoogleMeetSvg />
                </Box>
              </Stack>
            }
          >
            Join Lecture
          </Button>
        </Box>
      </Stack>

      <Box flex={1}>
        {isAvailable && (
          <Stack spacing={3}>
            <RichTextViewer content={materials.richText[currentLang]} />
            <LectureTest test={materials.evaluation} />
          </Stack>
        )}
      </Box>

      <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
        <Button variant="outlined">Previous</Button>
        <Button variant="primary">Next</Button>
      </Stack>
    </Stack>
  )
}

export default LectureContent

import React, { Fragment } from 'react'
import { map } from 'lodash'

import { Box, Paper, Stack, Typography, useTheme } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'
import { serveStaticImage } from '../../../state/asynchronous'
import RichTextViewer from '../RichTextViewer'
import { useTranslation } from 'react-i18next'

const Lector = ({ lector }) => {
  const { profilePicture, firstName, middleName, lastName, lectorDetails } = lector
  const theme = useTheme()
  const { i18n } = useTranslation()
  const currentLang = i18n.language

  const avatar = profilePicture ? serveStaticImage(profilePicture) : ''
  const name = [firstName, middleName, lastName].join(' ')

  return (
    <Paper>
      <Stack
        sx={{
          aspectRatio: 1,
          height: '100%',

          '&:hover .image': {
            height: '0%',
          },

          '& .details': {
            textAlign: 'center',
          },

          '&:hover .details': {
            textAlign: 'left',
            height: '100%',
          },

          '&:hover .qualification': {
            display: 'block',
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          height={{ xs: '70%', md: '50%' }}
          className="image"
          sx={{
            overflow: 'hidden',
            transition: 'height .3s',
            backgroundColor: theme.palette.snowFog.light,
            img: {
              height: { xs: 220, md: 150 },
            },
          }}
        >
          <img src={avatar} />
        </Stack>
        <Box
          height={{ xs: '30%', md: '50%' }}
          className="details"
          sx={{ p: 2, transition: 'height .3s', overflowY: 'auto' }}
        >
          <Typography fontWeight="bold">{name}</Typography>
          {lectorDetails && (
            <Fragment>
              <Typography color="stormWave.main" pb={2}>
                {lectorDetails.credentials}
              </Typography>
              <RichTextViewer content={lectorDetails.biography[currentLang]} />
            </Fragment>
          )}
        </Box>
      </Stack>
    </Paper>
  )
}

const Lectors = ({ lectors }) => {
  return (
    <SectionWrapper>
      <Typography textAlign="center" fontSize={24} fontWeight="bold" pt={5} pb={2}>
        Lectors
      </Typography>
      <Box
        container
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
          gap: 2,
          px: 2,
        }}
      >
        {map(lectors, (lector, index) => (
          <Lector key={index} lector={lector} />
        ))}
      </Box>
    </SectionWrapper>
  )
}

export default Lectors

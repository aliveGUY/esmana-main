import { Box, Grid2, Paper, Stack, Typography, useTheme } from '@mui/material'
import { map } from 'lodash'
import React from 'react'
import SectionWrapper from '../../common/SectionWrapper'
import usePredefinedAvatar from '../../../hooks/usePredefinedAvatar'

const Lector = ({ lector }) => {
  const { avatar, name, title, qualification } = lector
  const AvatarPng = usePredefinedAvatar(avatar)
  const theme = useTheme()

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
          <img src={AvatarPng} />
        </Stack>
        <Box
          height={{ xs: '30%', md: '50%' }}
          className="details"
          sx={{ p: 2, transition: 'height .3s', overflowY: 'auto' }}
        >
          <Typography fontWeight="bold">{name}</Typography>
          <Typography color="stormWave.main">{title}</Typography>
          <Typography className="qualification" display="none">
            {qualification}
          </Typography>
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

import { Box, Grid2, Paper, Stack, Typography } from '@mui/material'
import { map } from 'lodash'
import React from 'react'
import SectionWrapper from '../../common/SectionWrapper'
import usePredefinedAvatar from '../../../hooks/usePredefinedAvatar'

const Lector = ({ lector }) => {
  const { avatar, name, title, qualification } = lector
  const AvatarPng = usePredefinedAvatar(avatar)

  return (
    <Paper>
      <Stack
        sx={{
          aspectRatio: 1,
          height: '100%',

          '&:hover .image': {
            height: '0%',
          },

          '&:hover .details': {
            height: '100%',
          },

          '&:hover .qualification': {
            display: 'block',
          },
        }}
      >
        <Box height="50%" className="image" sx={{ overflow: 'hidden', transition: 'height .3s' }}>
          <img src={AvatarPng} />
        </Box>
        <Box height="50%" className="details" sx={{ p: 2, transition: 'height .3s', overflowY: 'auto' }}>
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
      <Typography textAlign="center" fontSize={24} fontWeight="bold" py={2}>
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

import React, { useRef } from 'react'

import TouchRipple from '@mui/material/ButtonBase/TouchRipple'

import { Box, Divider, Stack, Typography } from '@mui/material'
import { ENGLISH, UKRAINIAN } from '../../../constants'

const ToggleButton = ({ children, value, onClick, active = false }) => {
  const rippleRef = useRef(null)

  const onRippleStart = (e) => {
    onClick(value)
    rippleRef.current.start(e)
  }

  const onRippleStop = (e) => {
    rippleRef.current.stop(e)
  }

  return (
    <Box
      onMouseDown={onRippleStart}
      onMouseUp={onRippleStop}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',

        backgroundColor: active && 'snowFog.main',
      }}
    >
      <Typography fontWeight="bold" px={2} py={1}>
        {children}
      </Typography>
      <Box sx={{ color: 'stormWave.light' }}>
        <TouchRipple ref={rippleRef} center={false} />
      </Box>
    </Box>
  )
}

const LanguageToggle = ({ onClick, currentLanguage }) => {
  return (
    <Stack
      direction="row"
      sx={{
        border: '1px solid',
        borderColor: 'stormWave.main',
        width: 'max-content',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <ToggleButton value={ENGLISH} onClick={onClick} active={currentLanguage === ENGLISH}>
        English
      </ToggleButton>
      <Divider orientation="vertical" flexItem sx={{ borderColor: 'stormWave.main' }} />
      <ToggleButton value={UKRAINIAN} onClick={onClick} active={currentLanguage === UKRAINIAN}>
        Українська
      </ToggleButton>
    </Stack>
  )
}

export default LanguageToggle

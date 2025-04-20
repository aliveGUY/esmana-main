import React, { Fragment } from 'react'

import { Box, IconButton, Slide, Stack, useTheme } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

const MobileFlyoutMenu = ({ isCollapsed, onClose, children }) => {
  const theme = useTheme()

  return (
    <Fragment>
      <Box
        onClick={onClose}
        sx={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          pointerEvents: isCollapsed ? 'none' : 'auto',
          backgroundColor: isCollapsed ? 'transparent' : theme.palette.stormWave.dark + '50', // 50 === 80% opacity
          transition: 'background-color .2s',
          zIndex: 1,
        }}
      />
      <Slide direction="right" in={!isCollapsed} mountOnEnter unmountOnExit>
        <Stack
          sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            boxShadow: '',
            backgroundColor: 'white',
            width: 250,
            zIndex: 1,
          }}
        >
          <Stack direction="row" justifyContent="end" pt={1} pr={1}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          {children}
        </Stack>
      </Slide>
    </Fragment>
  )
}

export default MobileFlyoutMenu

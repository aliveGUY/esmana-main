import React, { Fragment, useRef, useState } from 'react'

import { Box, Popover, useMediaQuery, useTheme } from '@mui/material'
import MobileFlyoutMenu from './MobileFlyoutMenu'

const LargePopover = ({ children, content }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  if (isMobile) {
    return (
      <Fragment>
        <Box onClick={handleClick}>{children}</Box>
        <MobileFlyoutMenu isCollapsed={!open} onClose={handleClose}>
          {content}
        </MobileFlyoutMenu>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Box onClick={handleClick}>{children}</Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {content}
      </Popover>
    </Fragment>
  )
}

export default LargePopover

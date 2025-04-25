import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import { isNull, map } from 'lodash'

import { Box, Button as MuiButton, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import MobileFlyoutMenu from '../common/MobileFlyoutMenu'

import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PersonIcon from '@mui/icons-material/Person'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'

const NavLink = ({ path, name, defaultIcon, isCollapsed, activeIcon, onClick }) => {
  const match = useMatch(path)
  const isInactive = isNull(match)

  return (
    <Tooltip title={isCollapsed && name} arrow placement="right" enterDelay={1000}>
      <MuiButton
        component={Link}
        to={path}
        startIcon={isInactive ? defaultIcon : activeIcon}
        variant="sidenav"
        isInactive={isInactive}
        isCollapsed={isCollapsed}
        onClick={onClick}
      >
        {name}
      </MuiButton>
    </Tooltip>
  )
}

const Navigation = ({ isCollapsed, onClose }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const config = [
    {
      name: 'Profile',
      path: '/dashboard/profile',
      defaultIcon: <PersonOutlinedIcon />,
      activeIcon: <PersonIcon />,
    },
    {
      name: 'Users',
      path: '/dashboard/users',
      defaultIcon: <PeopleAltOutlinedIcon />,
      activeIcon: <PeopleAltIcon />,
    },
    {
      name: 'Courses',
      path: '/dashboard/courses',
      defaultIcon: <AutoStoriesOutlinedIcon />,
      activeIcon: <AutoStoriesIcon />,
    },
  ]

  if (isMobile) {
    return (
      <MobileFlyoutMenu isCollapsed={isCollapsed} onClose={onClose}>
        <Stack spacing={1} px={1} py={2}>
          {map(config, (item, index) => (
            <NavLink key={index} onClick={onClose} {...item} />
          ))}
        </Stack>
      </MobileFlyoutMenu>
    )
  }

  return (
    <Box
      sx={{
        width: isCollapsed ? 81 : 240,
        transition: 'width .3s',
      }}
    >
      <Stack
        spacing={1}
        px={1}
        py={2}
        sx={{
          position: 'sticky',
          top: 64,
        }}
      >
        {map(config, (item, index) => (
          <NavLink key={index} isCollapsed={isCollapsed} {...item} />
        ))}
      </Stack>
    </Box>
  )
}

export default Navigation

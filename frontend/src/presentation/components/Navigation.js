import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import { map } from 'lodash'

import { Box, Button as MuiButton, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import MobileFlyoutMenu from '../common/MobileFlyoutMenu'

import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PersonIcon from '@mui/icons-material/Person'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'

const NavLink = ({ path, name, defaultIcon, isCollapsed, selected, activeIcon, onClick }) => {
  return (
    <Tooltip title={isCollapsed && name} arrow placement="right" enterDelay={1000}>
      <MuiButton
        component={Link}
        to={path}
        startIcon={selected ? activeIcon : defaultIcon}
        variant="sidenav"
        isInactive={!selected}
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

  const courseMarketing = useMatch('/dashboard/course-details/:id')
  const courses = useMatch('/dashboard/courses')
  const course = useMatch('/dashboard/course/:courseId/:lectureId')
  const createCourse = useMatch('/dashboard/course/new')
  const createLecture = useMatch('/dashboard/course/new/lecture/new')
  const editLectureDraft = useMatch('/dashboard/course/new/lecture/:id')
  const users = useMatch('/dashboard/users')
  const profile = useMatch('/dashboard/profile')

  const config = [
    {
      name: 'Profile',
      path: '/dashboard/profile',
      defaultIcon: <PersonOutlinedIcon />,
      activeIcon: <PersonIcon />,
      selected: profile,
    },
    {
      name: 'Users',
      path: '/dashboard/users',
      defaultIcon: <PeopleAltOutlinedIcon />,
      activeIcon: <PeopleAltIcon />,
      selected: users,
    },
    {
      name: 'Courses',
      path: '/dashboard/courses',
      defaultIcon: <AutoStoriesOutlinedIcon />,
      activeIcon: <AutoStoriesIcon />,
      selected: courseMarketing || courses || course || createCourse || createLecture || editLectureDraft,
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

import React from 'react'
import { Link, useMatch, useNavigate } from 'react-router-dom'
import { map } from 'lodash'

import { Box, Button as MuiButton, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import MobileFlyoutMenu from '../common/MobileFlyoutMenu'

import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PersonIcon from '@mui/icons-material/Person'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import { useLogoutMutation } from '../../state/asynchronous'

const NavLink = ({ path = null, name, defaultIcon, isCollapsed, selected = false, activeIcon, onClick }) => {
  return (
    <Tooltip title={isCollapsed && name} arrow placement="right" enterDelay={1000}>
      <MuiButton
        {...(path && {
          component: Link,
          to: path,
        })}
        startIcon={selected && activeIcon ? activeIcon : defaultIcon}
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
  const [logout, { isLoading }] = useLogoutMutation()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const courseMarketing = useMatch('/dashboard/course-details/:id')
  const courses = useMatch('/dashboard/courses')
  const course = useMatch('/dashboard/course/:courseId/:lectureId')
  const createCourse = useMatch('/dashboard/course/new')
  const createLecture = useMatch('/dashboard/course/new/lecture/new')
  const editLectureDraft = useMatch('/dashboard/course/new/lecture/:id')
  const editLecture = useMatch('/dashboard/course/edit/:courseId/lecture/:id')
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
      selected:
        courseMarketing || courses || course || createCourse || createLecture || editLectureDraft || editLecture,
    },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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
    <Stack
      sx={{
        width: isCollapsed ? 81 : 240,
        transition: 'width .3s',
        height: 'calc(100vh - 64px)',
        position: 'sticky',
        top: 64,
      }}
    >
      <Stack flex={1} spacing={1} px={1} py={2}>
        {map(config, (item, index) => (
          <NavLink key={index} isCollapsed={isCollapsed} {...item} />
        ))}
      </Stack>
      <Stack spacing={1} px={1} py={2}>
        <NavLink
          isCollapsed={isCollapsed}
          name={isLoading ? 'Loading...' : 'Logout'}
          onClick={handleLogout}
          defaultIcon={<LogoutIcon />}
        />
      </Stack>
    </Stack>
  )
}

export default Navigation

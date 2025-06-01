import React, { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Box, Stack, useMediaQuery, useTheme } from '@mui/material'
import Navigation from '../components/Navigation'
import TopBarNavigation from '../components/TopBarNavigation'
import { useAuth } from '../../hooks/useAuth'
import { useUpdateAuthMutation } from '../../state/asynchronous'

const DashboardLayout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(isMobile)
  const { isAuthorized } = useAuth()
  const [updateAuth] = useUpdateAuthMutation()

  console.log({ isAuthorized })

  const burgerToggle = useCallback(() => {
    setIsNavigationCollapsed((prev) => !prev)
  }, [])

  const handleClose = useCallback(() => {
    setIsNavigationCollapsed(true)
  }, [])

  useEffect(() => {
    if (!isAuthorized) {
      updateAuth()
    }
  }, [isAuthorized])

  return (
    <Stack minHeight="100vh">
      <TopBarNavigation onBurgerClick={burgerToggle} />
      <Stack direction="row" flex={1}>
        <Navigation isCollapsed={isNavigationCollapsed} onClose={handleClose} />
        <Box flex={1}>
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  )
}

export default DashboardLayout

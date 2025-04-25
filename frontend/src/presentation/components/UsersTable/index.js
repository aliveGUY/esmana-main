import React, { useEffect, useRef, useState } from 'react'
import { map } from 'lodash'

import { Box, useTheme } from '@mui/material'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

const UsersTable = ({ users }) => {
  const theme = useTheme()

  const scrollRef = useRef(null)
  const [showLeftFade, setShowLeftFade] = useState(false)
  const [showRightFade, setShowRightFade] = useState(false)

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return

    setShowLeftFade(el.scrollLeft > 0)
    setShowRightFade(el.scrollLeft + el.clientWidth < el.scrollWidth)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    handleScroll() // initial state
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box
      sx={{
        width: '100%',
        height: scrollRef.current?.offsetHeight,
        position: 'relative',

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '32px',
          backgroundColor: 'blue',
          transition: 'opacity .15s',
          opacity: showLeftFade ? 1 : 0,
          borderRadius: '12px 0 0 12px',
          zIndex: 1,
          background: `linear-gradient(-90deg,${theme.palette.stormWave.main}00 0%, ${theme.palette.stormWave.main} 100%);`,
        },

        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '32px',
          backgroundColor: 'blue',
          transition: 'opacity .15s',
          opacity: showRightFade ? 1 : 0,
          borderRadius: '0 12px 12px 0',
          zIndex: 1,
          background: `linear-gradient(90deg,${theme.palette.stormWave.main}00 0%, ${theme.palette.stormWave.main} 100%);`,
        },
      }}
    >
      <Box
        ref={scrollRef}
        sx={{
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateColumns: '100px auto 1fr 1fr auto auto 100px',
          border: `1px solid ${theme.palette.stormWave.main}`,
          borderRadius: '12px',
          position: 'absolute',
          left: 0,
          right: 0,
          overflowX: 'auto',
        }}
      >
        <TableHeader />
        {map(users, (user, index) => (
          <TableRow key={index} user={user} />
        ))}
      </Box>
    </Box>
  )
}

export default UsersTable

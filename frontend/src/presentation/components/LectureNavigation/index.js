import React, { useCallback, useState } from 'react'
import { find, map } from 'lodash'
import { useParams } from 'react-router'

import { Box, Collapse, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import LectureItem from './LectureItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const LectureNavigation = ({ lectures }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const theme = useTheme()
  const { lectureId } = useParams()
  const lecture = find(lectures, (lecture) => lecture.id === Number(lectureId))

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  return (
    <Stack
      sx={{
        backgroundColor: 'snowFog.main',
        borderRadius: '12px',
        height: 'min-content',
        px: { xs: 2, md: 1 },
        pt: { xs: 2, md: 1 },
        pb: { md: 1 },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" display={{ md: 'none' }} sx={{ mb: 2 }}>
        <Typography
          fontWeight="bold"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
          maxWidth={{ xs: '250px' }}
        >
          {lecture.title}
        </Typography>
        <IconButton variant="outlined" onClick={handleToggle}>
          {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Stack>

      <Collapse in={!isMobile || isExpanded}>
        <Stack spacing={1}>
          {map(lectures, (lecture) => (
            <LectureItem lecture={lecture} />
          ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

export default LectureNavigation

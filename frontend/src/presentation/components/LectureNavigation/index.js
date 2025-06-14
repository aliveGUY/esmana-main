import React, { useCallback, useState } from 'react'
import { find, map } from 'lodash'
import { useParams } from 'react-router'

import { Box, Collapse, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useLectures } from '../../../hooks'
import LectureItem from './LectureItem'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const LectureNavigation = () => {
  const { sortedLectures } = useLectures()

  const theme = useTheme()
  const { lectureId } = useParams()
  const [isExpanded, setIsExpanded] = useState(false)
  const lecture = find(sortedLectures, (lecture) => lecture.id === Number(lectureId))
  const { blockedLectureIds } = useLectures()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev)
  }, [])

  return (
    <Box sx={{ height: '100%' }}>
      <Stack
        sx={{
          backgroundColor: 'snowFog.main',
          borderRadius: '12px',
          height: 'min-content',
          position: 'sticky',
          top: 64,
          px: 1,
          pt: { xs: 2, md: 1 },
          pb: { md: 1 },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            display: { xs: 'grid', md: 'none' },
            gridTemplateColumns: '1fr auto',
            gap: 1,
            mb: 2,
            px: 1,
          }}
        >
          <Typography fontWeight="bold" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            {lecture.title}
          </Typography>
          <IconButton variant="outlined" onClick={handleToggle}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Stack>

        <Collapse in={!isMobile || isExpanded}>
          <Stack spacing={1} sx={{ pb: 2 }}>
            {map(sortedLectures, (lecture) => (
              <LectureItem lecture={lecture} isIncomplete={blockedLectureIds.includes(lecture.id)} />
            ))}
          </Stack>
        </Collapse>
      </Stack>
    </Box>
  )
}

export default LectureNavigation

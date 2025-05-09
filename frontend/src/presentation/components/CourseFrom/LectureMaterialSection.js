import React from 'react'

import { Box, Paper } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'
import RichTextEditor from '../RichTextEditor'

const LectureMaterialSection = () => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Box p={2}>
            <RichTextEditor />
          </Box>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default LectureMaterialSection

import React, { useState } from 'react'
import { isEmpty } from 'lodash'
import { useFormContext } from 'react-hook-form'

import { Autocomplete, Box, FormControl, Paper, Stack, TextField } from '@mui/material'
import { useSearchVideosMutation } from '../../../state/asynchronous'
import EmbeddedVideo from '../../common/EmbeddedVideo'
import SectionWrapper from '../../common/SectionWrapper'

const VideoSection = () => {
  const { setValue, watch } = useFormContext()
  const [searchVideos, { data }] = useSearchVideosMutation()
  const [selectedVideo, setSelectedVideo] = useState(null)
  const videoId = watch('videoUrl')

  const handleFocus = (e) => {
    searchVideos(e.target.value)
  }

  const handleInputChange = (event, value) => {
    searchVideos(value)
  }

  const handleChange = (event, newValue) => {
    setSelectedVideo(null)
    setValue('videoUrl', newValue ? newValue.videoId : '')
  }

  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack p={2} spacing={2} alignItems="center">
            <Autocomplete
              disablePortal
              onFocus={handleFocus}
              onInputChange={handleInputChange}
              onChange={handleChange}
              value={selectedVideo}
              options={data || []}
              getOptionLabel={(option) => option.title || ''}
              sx={{ width: 400 }}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <img loading="lazy" width="50" src={option.thumbnail} alt="" style={{ marginRight: 8 }} />
                  {option.title}
                </Box>
              )}
              renderInput={(params) => (
                <FormControl fullWidth>
                  <TextField {...params} label="Video" />
                </FormControl>
              )}
            />

            {!isEmpty(videoId) && <EmbeddedVideo videoId={videoId} />}
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default VideoSection

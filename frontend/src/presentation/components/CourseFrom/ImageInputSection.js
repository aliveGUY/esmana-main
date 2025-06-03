import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Stack, Typography } from '@mui/material'
import { setThumbnailFile } from '../../../state/reducers/courseForm'
import SectionWrapper from '../../common/SectionWrapper'

import ImageIcon from '@mui/icons-material/Image'
import { serveStaticImage } from '../../../state/asynchronous'

const ImageInputSection = () => {
  const fileInputRef = useRef(null)
  const thumbnailFile = useSelector((state) => state.courseForm.thumbnailFile)
  const thumbnailUrl = useSelector((state) => state.courseForm.thumbnailUrl)
  const dispatch = useDispatch()
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (thumbnailFile) {
      const url = URL.createObjectURL(thumbnailFile)
      setPreviewUrl(url)

      return () => {
        URL.revokeObjectURL(url)
      }
    }

    if (thumbnailUrl) {
      setPreviewUrl(serveStaticImage(thumbnailUrl))
      return
    }

    setPreviewUrl(null)
  }, [thumbnailFile, thumbnailUrl])

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    dispatch(setThumbnailFile(file))
  }

  return (
    <Box
      sx={{
        backgroundColor: previewUrl ? 'snowFog.dark' : 'snowFog.main',
        transition: 'background-color .3s',
        position: 'relative',
        cursor: 'pointer',
        p: 2,

        img: {
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },

        '&:hover': {
          backgroundColor: previewUrl ? 'snowFog.main' : 'snowFog.light',
        },
      }}
    >
      {previewUrl && (
        <img src={previewUrl} alt="Course thumbnail" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      )}
      <SectionWrapper>
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleChange} />

        <Box
          onClick={() => fileInputRef.current.click()}
          sx={{
            position: 'relative',
            height: '200px',
            border: '2px dashed',
            borderColor: 'stormWave.main',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {previewUrl ? (
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
              }}
            >
              <ImageIcon sx={{ width: 24, height: 24, color: 'stormWave.main' }} />
            </Box>
          ) : (
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{ color: 'stormWave.main', height: '100%', width: '100%' }}
            >
              <ImageIcon sx={{ width: 40, height: 40 }} />
              <Typography fontWeight="bold">Select Image</Typography>
            </Stack>
          )}
        </Box>
      </SectionWrapper>
    </Box>
  )
}

export default ImageInputSection

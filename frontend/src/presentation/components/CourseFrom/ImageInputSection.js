import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Stack, Typography } from '@mui/material'
import { setThumbnailUrl } from '../../../state/reducers/courseForm'
import SectionWrapper from '../../common/SectionWrapper'

import ImageIcon from '@mui/icons-material/Image'

const ImageInputSection = () => {
  const fileInputRef = useRef(null)
  const thumbnail = useSelector((state) => state.courseForm.thumbnailUrl)
  const dispatch = useDispatch()

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const base64 = await convertToBase64(file)

    dispatch(setThumbnailUrl(base64))
  }

  return (
    <Box
      sx={{
        backgroundColor: thumbnail ? 'snowFog.dark' : 'snowFog.main',
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
          backgroundColor: thumbnail ? 'snowFog.main' : 'snowFog.light',
        },
      }}
    >
      {thumbnail && (
        <img src={thumbnail} alt="Course thumbnail" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
          {thumbnail ? (
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

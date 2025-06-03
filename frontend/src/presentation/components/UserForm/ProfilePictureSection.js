import React, { useState, useRef } from 'react'
import { Avatar, IconButton, Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { serveStaticImage } from '../../../state/asynchronous'
import EmptyImage from '../../../static/images/no-image.jpg'

const ProfilePictureSection = () => {
  const { setValue, getValues } = useFormContext()
  const [imageSrc, setImageSrc] = useState(null)
  const inputRef = useRef(null)
  const profilePicture = getValues('profilePicture')
  const defaultImage = profilePicture ? serveStaticImage(profilePicture) : EmptyImage

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setValue('profilePicture', file)

      const reader = new FileReader()
      reader.onload = () => {
        setImageSrc(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
      <IconButton
        onClick={handleClick}
        sx={{
          width: 240,
          height: 240,
          borderRadius: '50%',
          padding: 0,
          overflow: 'hidden',
          border: '2px solid #ccc',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Avatar src={imageSrc ? imageSrc : defaultImage} sx={{ width: 240, height: 240 }} />
      </IconButton>

      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
    </Box>
  )
}

export default ProfilePictureSection

import React, { useRef, useState } from 'react'
import { Avatar, IconButton, Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { serveStaticImage } from '../../../state/asynchronous'
import EmptyImage from '../../../static/images/no-image.jpg'

const ProfilePictureSection = () => {
  const { setValue, getValues } = useFormContext()
  const inputRef = useRef(null)
  const profilePicture = getValues('profilePicture')
  const [base64Image, setBase64Image] = useState(null)
  const defaultImage = profilePicture ? serveStaticImage(profilePicture) : EmptyImage

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setValue('profilePictureFile', file)

      const reader = new FileReader()
      reader.onload = () => {
        setBase64Image(reader.result)
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
        <Avatar src={base64Image ?? defaultImage} sx={{ width: 240, height: 240 }} />
      </IconButton>

      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
    </Box>
  )
}

export default ProfilePictureSection

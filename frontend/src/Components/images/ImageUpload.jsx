import React, { useState } from 'react'
import { Button, Card, CardActions, CardMedia } from '@mui/material'

function ImageUpload({ image, setImage }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        console.log(base64String)
        setImage(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      {image && (
        <CardMedia
          style={{ maxHeight: 350 }}
          component="img"
          image={image}
          alt="Uploaded image"
        />
      )}
      <CardActions>
        <Button variant="contained" component="label">
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
      </CardActions>
    </Card>
  )
}

export default ImageUpload

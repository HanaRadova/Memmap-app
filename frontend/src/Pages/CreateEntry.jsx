import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Card } from '@mui/material'
import TextField from '@mui/material/TextField'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import * as React from 'react'
import ImageUpload from '../Components/images/ImageUpload.jsx'
import { usePhotoApi } from '../hooks/usePhotoApi.js'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { formatDate } from '../utils/formatDate.js'

export const CreateEntry = () => {
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [date, setDate] = useState()
  const disabled = !description && !image
  const { createPhoto, getAllPhotos } = usePhotoApi()
  const navigate = useNavigate()

  const { locationId, travelPlanId } = useParams()

  const handleCreation = () => {
    const entry = { description, image, locationId, dateTime: date }
    createPhoto(entry).then((result) => {
      navigate(`/travel-plan/${travelPlanId}`)
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Card variant="outlined" sx={{ width: '100%' }}>
          <DatePicker
            defaultValue={new Date()}
            onChange={(date) => {
              setDate(formatDate(date))
            }}
          />
          <ImageUpload image={image} setImage={setImage} />
          <Box p={3}>
            <TextField
              variant="outlined"
              value={description}
              fullWidth={true}
              label="Záznam"
              onChange={(e) => setDescription(e.target.value)}
            ></TextField>
            <CardActions>
              <Button size="small" disabled={disabled} onClick={handleCreation}>
                Vytvořit záznam
              </Button>
            </CardActions>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}

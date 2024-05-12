import { LocationMap } from '../Components/location/LocationMap.jsx'
import { Box, Card, Grid } from '@mui/material'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLocationApi } from '../hooks/useLocationApi.js'
import { useState } from 'react'
import TextField from '@mui/material/TextField'

export const CreateLocation = () => {
  const [coords, setCoords] = useState(null)
  const [name, setName] = useState('')
  const { id } = useParams()
  const { createLocation } = useLocationApi()
  const navigate = useNavigate()

  const handleCreateLocation = async () => {
    const location = { name, coordinations: coords, travelPlanId: id }
    const result = await createLocation(location)
    if (result) {
      console.log('Location created:', result)
      navigate(`/travel-plan/${id}`)
    }
  }

  const disabled = !coords || !name

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
          <LocationMap setCoords={setCoords} />
          <Box p={3}>
            <TextField
              variant="outlined"
              value={name}
              fullWidth={true}
              label="Název Místa"
              onChange={(e) => setName(e.target.value)}
            ></TextField>
            <CardActions>
              <Button
                size="small"
                disabled={disabled}
                onClick={handleCreateLocation}
              >
                Vytvořit novou lokalitu
              </Button>
            </CardActions>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}

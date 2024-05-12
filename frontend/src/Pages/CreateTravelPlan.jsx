import { useContext, useState } from 'react'
import { Box, Button, Grid, Paper, Stack } from '@mui/material'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker } from 'react-date-range'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTravelApi } from '../hooks/useTravelApi.js'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../utils/formatDate.js'
import ImageUpload from '../Components/images/ImageUpload.jsx'

export const CreateTravelPlan = () => {
  const [image, setImage] = useState('')

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const [name, setName] = useState('')
  const { createTravelPlan } = useTravelApi()
  const navigate = useNavigate()

  function handleSelect(ranges) {
    setState([ranges.selection])
  }

  function handleCreateClick() {
    const newTravelPlan = {
      name: name,
      from: formatDate(state[0].startDate),
      until: formatDate(state[0].endDate),
      image,
    }
    createTravelPlan(newTravelPlan).then((result) => {
      navigate('/')
    })
  }

  return (
    <Grid
      container
      justifyContent="center"
      spacing={3}
      sx={{ textAlign: 'center' }}
    >
      <Grid item xs={12}>
        <Typography component="h2" variant="h5">
          Vytváření Dovolené
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Box className="date-picker-box" spacing={2}>
            <DateRangePicker ranges={state} onChange={handleSelect} />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          value={name}
          fullWidth={true}
          label="Název dovolené"
          onChange={(e) => setName(e.target.value)}
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <ImageUpload image={image} setImage={setImage} />
      </Grid>

      {name.length > 3 && state[0] && (
        <Box
          sx={{
            p: 3,
            mb: -2,
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button onClick={handleCreateClick} variant={'contained'}>
            Vytvořit dovolenou
          </Button>
        </Box>
      )}
    </Grid>
  )
}

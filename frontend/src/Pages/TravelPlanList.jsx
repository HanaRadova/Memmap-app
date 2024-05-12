import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useTravelApi } from '../hooks/useTravelApi.js'
import { Box } from '@mui/material'

export const TravelPlanList = ({ mode }) => {
  const { getAllTravelPlans } = useTravelApi()
  const [travelPlans, setTravelPlans] = useState([])

  useEffect(() => {
    getAllTravelPlans().then((result) => {
      setTravelPlans(result)
    })
  }, [])

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
      {mode === 'future' ? (
        <Typography variant="h4">Plánované dovolené</Typography>
      ) : null}
      {mode === 'past' ? (
        <Typography variant="h4">Proběhlé dovolené</Typography>
      ) : null}
      {mode === 'current' ? (
        <Typography variant="h4">Právě probíhající dovolené</Typography>
      ) : null}
      <Box
        sx={{
          display: 'flex',
        }}
        p={3}
      >
        {travelPlans &&
          travelPlans.map((travelPlan) => (
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt={travelPlan.name}
                height="140"
                image={`${import.meta.env.VITE_API_URL}/${travelPlan.imageUrl}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {travelPlan.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Od: {travelPlan.from}
                  <br />
                  Do: {travelPlan.until}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Otevřít</Button>
              </CardActions>
            </Card>
          ))}
      </Box>
    </Box>
  )
}

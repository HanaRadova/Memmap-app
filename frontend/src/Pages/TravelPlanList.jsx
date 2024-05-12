import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useMemo, useState } from 'react'
import { useTravelApi } from '../hooks/useTravelApi.js'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const TravelPlanList = ({ mode }) => {
  const { getAllTravelPlans } = useTravelApi()
  const [travelPlansBeforeFilter, setTravelPlans] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getAllTravelPlans().then((result) => {
      setTravelPlans(result)
    })
  }, [])

  const travelPlans = useMemo(() => {
    if (mode === 'future') {
      return travelPlansBeforeFilter.filter((travelPlan) => {
        return new Date(travelPlan.from) > new Date()
      })
    }
    if (mode === 'past') {
      return travelPlansBeforeFilter.filter((travelPlan) => {
        return new Date(travelPlan.until) < new Date()
      })
    }
    if (mode === 'current') {
      return travelPlansBeforeFilter.filter((travelPlan) => {
        return (
          new Date(travelPlan.from) < new Date() &&
          new Date(travelPlan.until) > new Date()
        )
      })
    }
  }, [travelPlansBeforeFilter, mode])

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
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
        }}
        p={3}
      >
        {travelPlans &&
          travelPlans.map((travelPlan) => (
            <Card key={travelPlan.id} sx={{ width: 345 }}>
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
                <Button
                  size="small"
                  onClick={() => navigate(`/travel-plan/${travelPlan.id}`)}
                >
                  Otevřít
                </Button>
              </CardActions>
            </Card>
          ))}
      </Box>
    </Box>
  )
}

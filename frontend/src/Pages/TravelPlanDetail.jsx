import Typography from '@mui/material/Typography'
import * as React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useTravelApi } from '../hooks/useTravelApi.js'
import { useNavigate, useParams } from 'react-router-dom'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useLocationApi } from '../hooks/useLocationApi.js'
import { DisplayMap } from '../Components/location/DisplayMap.jsx'
import { DisplayTravelMap } from '../Components/location/DisplayTravelMap.jsx'
import { usePhotoApi } from '../hooks/usePhotoApi.js'

export const TravelPlanDetail = () => {
  const [travelPlan, setTravelPlan] = useState()
  const [locations, setLocations] = useState()
  const [photos, setPhotos] = useState()

  const { getTravelPlan } = useTravelApi()
  const { getAllPhotos } = usePhotoApi()
  const { getAllByTravelPlanId } = useLocationApi()
  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    getTravelPlan(id).then((result) => {
      setTravelPlan(result)
      getAllByTravelPlanId(id).then((locations) => {
        setLocations(locations)
      })
      getAllPhotos().then((photos) => {
        setPhotos(photos)
      })
    })
  }, [])

  if (!travelPlan) return null

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
        <Card variant="outlined" key={travelPlan.id} sx={{ width: '100%' }}>
          <CardContent>
            <Typography variant="h4" component="div">
              {travelPlan.name}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            alt={travelPlan.name}
            height="140"
            image={`${import.meta.env.VITE_API_URL}/${travelPlan.imageUrl}`}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Od: {travelPlan.from}
              <br />
              Do: {travelPlan.until}
            </Typography>
            {locations && locations.length > 0 && (
              <DisplayTravelMap locations={locations} />
            )}
          </CardContent>
          {locations &&
            locations.map((location) => (
              <Accordion key={location.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {location.name}
                </AccordionSummary>
                <AccordionDetails>
                  <DisplayMap coords={location.coordinations} />
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 2,
                      justifyContent: 'center',
                    }}
                  >
                    {photos
                      ?.filter((photo) => photo.locationId === location.id)
                      ?.map((ph) => (
                        <Card
                          variant="outlined"
                          key={ph.id}
                          sx={{ width: '340px' }}
                        >
                          <CardContent>
                            <Typography variant="h6" component="div">
                              {ph.description}
                            </Typography>
                          </CardContent>
                          {ph.url && (
                            <CardMedia
                              component="img"
                              alt={ph.description}
                              height="140"
                              image={`${import.meta.env.VITE_API_URL}/${ph.url}`}
                            />
                          )}
                        </Card>
                      ))}
                  </Box>

                  <Button
                    onClick={() =>
                      navigate(`/create-entry/${location.id}/${travelPlan.id}`)
                    }
                    size="small"
                  >
                    ++ Přidat Fotku / Záznam
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))}
          <CardActions>
            <Button
              size="small"
              onClick={() => navigate(`/create-location/${travelPlan.id}`)}
            >
              ++ Přidat Lokaci
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  )
}

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, Button, Grid, Stack } from '@mui/material'

export const Home = () => {
  let [text, setText] = useState('default text')

  const navigate = useNavigate()

  const goTo = (url) => () => {
    navigate(url)
  }

  return (
    <Box p={3}>
      <Grid>
        <Grid item xs={12} md={4}>
          <Stack alignItems="center" spacing={1}>
            <Button
              className={'menu-button'}
              onClick={goTo('/create-travel-plan')}
              variant="contained"
            >
              Nová dovolená
            </Button>
            <Button
              className={'menu-button'}
              onClick={goTo('/travel-plan-list/future')}
              variant="outlined"
            >
              Plánované dovolené
            </Button>
            <Button
              className={'menu-button'}
              onClick={goTo('/travel-plan-list/current')}
              variant="outlined"
            >
              Právě probíhá
            </Button>
            <Button
              className={'menu-button'}
              onClick={goTo('/travel-plan-list/past')}
            >
              Již proběhlo
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

import React from 'react'
import { styled } from '@mui/system'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { MapSVG } from '../assets/MapSVG.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Main = styled('main')(({ theme }) => ({
  width: 'auto',
  display: 'block',
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
    width: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  padding: `20px`,
  maxWidth: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
}))

const StyledForm = styled('div')({
  width: '100%',
  marginTop: '8px',
})

const BackButton = styled(Button)({
  position: 'absolute',
  top: '10px',
  left: '10px',
})

function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const goToMenu = () => {
    navigate('/')
  }

  return (
    <Main>
      <CssBaseline />
      <StyledPaper>
        <MapSVG />
        {location.pathname !== '/' && (
          <BackButton onClick={goToMenu}>Zpět do menu</BackButton>
        )}
        <Typography
          style={{
            textShadow: '-4px 15px 50px rgba(199,255,199,1)',
            color: '#2FBD94FF',
          }}
          component="h1"
          variant="h2"
        >
          Memmap
        </Typography>
        <StyledForm>{children}</StyledForm>
      </StyledPaper>
    </Main>
  )
}

export default Layout

import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home.jsx'
import { CreateTravelPlan } from './Pages/CreateTravelPlan.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState } from 'react'
import { AppStore } from './store/appStore.js'
import { CreateLocation } from './Pages/CreateLocation.jsx'
import Layout from './Components/Layout.jsx'
import { TravelPlanList } from './Pages/TravelPlanList.jsx'
import { TravelPlanDetail } from './Pages/TravelPlanDetail.jsx'
import { CreateEntry } from './Pages/CreateEntry.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import cs from 'date-fns/locale/cs'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2FBD94FF',
      light: '#2FBD94FF',
      dark: '#2FBD94FF',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4FD9DB',
      light: '#4FD9DB',
      dark: '#4FD9DB',
      contrastText: '#ffffff',
    },
  },
  background: {
    default: '#161616',
    paper: '#161616',
  },
  text: {
    primary: '#ffffff',
    secondary: '#ffffff',
  },
})

export function AppRouter() {
  const [value, setValue] = useState({
    travelPlans: [],
    photos: [],
    locations: [],
  })

  return (
    <AppStore.Provider value={{ value, setValue }}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={cs}>
          <HashRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/create-travel-plan"
                  element={<CreateTravelPlan />}
                />
                <Route
                  path="/create-location/:id"
                  element={<CreateLocation />}
                />
                <Route
                  path="/create-entry/:locationId/:travelPlanId"
                  element={<CreateEntry />}
                />
                <Route
                  path="/travel-plan-list/future"
                  element={<TravelPlanList mode="future" />}
                />
                <Route
                  path="/travel-plan-list/past"
                  element={<TravelPlanList mode="past" />}
                />
                <Route
                  path="/travel-plan-list/current"
                  element={<TravelPlanList mode="current" />}
                />
                <Route
                  path="/travel-plan/:id"
                  element={<TravelPlanDetail mode="current" />}
                />
              </Routes>
            </Layout>
          </HashRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </AppStore.Provider>
  )
}

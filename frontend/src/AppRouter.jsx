import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { CreateTravelPlan } from './pages/CreateTravelPlan.jsx'
import { useState } from 'react'
import { AppStore } from './store/appStore.js'

export function AppRouter() {
  const [value, setValue] = useState({
    travelPlans: [],
    photos: [],
    locations: [],
  })

  return (
    <AppStore.Provider value={{ value, setValue }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-travel-plan" element={<CreateTravelPlan />} />
        </Routes>
      </HashRouter>
    </AppStore.Provider>
  )
}

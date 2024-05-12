import React, { useState, useRef } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Box, Grid, Paper } from '@mui/material'

function LocationMarker({ setCoords }) {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click(e) {
      console.log(`Clicked location: ${e.latlng.lat}, ${e.latlng.lng}`)
      setPosition(e.latlng)
      setCoords(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here.</Popup>
    </Marker>
  )
}

function SearchBar({ mapRef }) {
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState([])

  const handleSearchChange = async (event, value, reason) => {
    if (reason === 'selectOption' && value) {
      const { x, y } = value
      mapRef.current.flyTo(new L.LatLng(y, x), 15)
      setInputValue(value.label)
    }
  }

  const handleInputChange = async (event, newInputValue) => {
    setInputValue(newInputValue)
    if (newInputValue.length > 2) {
      const provider = new OpenStreetMapProvider()
      const results = await provider.search({ query: newInputValue })
      setOptions(results.map((r) => ({ label: `${r.label}`, x: r.x, y: r.y })))
    } else {
      setOptions([])
    }
  }

  return (
    <Autocomplete
      value={inputValue}
      onChange={handleSearchChange}
      onInputChange={handleInputChange}
      options={options}
      fullWidth
      style={{ marginBottom: '20px' }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a location"
          variant="outlined"
        />
      )}
    />
  )
}

export function LocationMap({ setCoords }) {
  const mapRef = useRef(null)

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box p={3} width="100%">
          <SearchBar mapRef={mapRef} />
          <MapContainer
            center={{ lat: 51.505, lng: -0.09 }}
            zoom={13}
            style={{ height: '90vh', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker setCoords={setCoords} />
          </MapContainer>
        </Box>
      </Grid>
    </Grid>
  )
}

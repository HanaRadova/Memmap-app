import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Box, Paper } from '@mui/material'

export function DisplayMap({ coords }) {
  if (!coords) {
    return null
  }

  return (
    <Box p={3} width="100%">
      <Paper elevation={3}>
        <MapContainer
          center={coords}
          zoom={13}
          style={{ height: '100px', width: '100%' }}
          scrollWheelZoom={false}
          dragging={false}
          touchZoom={false}
          doubleClickZoom={false}
          zoomControl={false}
          attributionControl={false}
          keyboard={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={coords}>
            <Popup>You are here</Popup>
          </Marker>
        </MapContainer>
      </Paper>
    </Box>
  )
}
